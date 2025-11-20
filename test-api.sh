#!/bin/bash

echo "Testing API endpoint..."
echo ""

curl -X POST http://localhost:3000/api/analyze \
  -F "symptoms=I have a red itchy rash on my arm" \
  | jq '.'

echo ""
echo "Test complete!"
