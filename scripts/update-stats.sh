#!/bin/bash
# Fetches topline stats from Dune Analytics and updates src/lib/data/stats.ts
# Requires DUNE_API_KEY environment variable
# Used by GitHub Actions on a schedule

set -euo pipefail

QUERY_ID=6963137

echo "Executing Dune query ${QUERY_ID}..."
EXEC_RESPONSE=$(curl -s -X POST \
  "https://api.dune.com/api/v1/query/${QUERY_ID}/execute" \
  -H "X-Dune-API-Key: ${DUNE_API_KEY}" \
  -H "Content-Type: application/json")

EXECUTION_ID=$(echo "$EXEC_RESPONSE" | jq -r '.execution_id')

if [ -z "$EXECUTION_ID" ] || [ "$EXECUTION_ID" = "null" ]; then
  echo "Failed to start execution: $EXEC_RESPONSE"
  exit 1
fi

echo "Execution ID: ${EXECUTION_ID}"
echo "Waiting for results..."

for i in $(seq 1 30); do
  sleep 10
  RESULT=$(curl -s \
    "https://api.dune.com/api/v1/execution/${EXECUTION_ID}/results" \
    -H "X-Dune-API-Key: ${DUNE_API_KEY}")

  STATE=$(echo "$RESULT" | jq -r '.state')

  if [ "$STATE" = "QUERY_STATE_COMPLETED" ]; then
    echo "Query completed."
    break
  elif [ "$STATE" = "QUERY_STATE_FAILED" ]; then
    echo "Query failed: $(echo "$RESULT" | jq -r '.error')"
    exit 1
  fi

  echo "  Still running (attempt $i/30)..."
done

if [ "$STATE" != "QUERY_STATE_COMPLETED" ]; then
  echo "Timed out waiting for query results"
  exit 1
fi

# Extract values
VOLUME=$(echo "$RESULT" | jq -r '.result.rows[0].total_volume_usd')
SWAPS=$(echo "$RESULT" | jq -r '.result.rows[0].total_swaps')
FEES=$(echo "$RESULT" | jq -r '.result.rows[0].total_fees_usd')

echo "Raw values: volume=$VOLUME swaps=$SWAPS fees=$FEES"

# Format values using node
FORMATTED=$(node -e "
const vol = ${VOLUME};
const swaps = ${SWAPS};
const fees = ${FEES};

const fmtB = (n) => '\$' + (n / 1e9).toFixed(1) + 'B+';
const fmtM = (n) => (n / 1e6).toFixed(1) + 'M+';
const fmtMDollar = (n) => '\$' + (n / 1e6).toFixed(1) + 'M+';

console.log(JSON.stringify({
  volume: fmtB(vol),
  swaps: fmtM(swaps),
  fees: fmtMDollar(fees)
}));
")

VOLUME_FMT=$(echo "$FORMATTED" | jq -r '.volume')
SWAPS_FMT=$(echo "$FORMATTED" | jq -r '.swaps')
FEES_FMT=$(echo "$FORMATTED" | jq -r '.fees')

echo "Formatted: volume=${VOLUME_FMT} swaps=${SWAPS_FMT} fees=${FEES_FMT}"

# Write updated stats.ts
cat > src/lib/data/stats.ts << EOF
export const globalStats = [
	{ label: 'Swap Volume', value: '${VOLUME_FMT}', href: 'https://dune.com/near/near-intents' },
	{ label: 'Total Swaps', value: '${SWAPS_FMT}', href: 'https://dune.com/near/near-intents' },
	{ label: 'Fees Generated', value: '${FEES_FMT}', href: 'https://dune.com/near/near-intents' },
	{ label: 'Chains Supported', value: '31', href: 'https://docs.near-intents.org/resources/chain-support' }
];
EOF

echo "Updated src/lib/data/stats.ts"
