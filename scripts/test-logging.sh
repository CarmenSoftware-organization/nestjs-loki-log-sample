#!/bin/bash

# Test script สำหรับ NestJS Loki Logger
# ใช้สำหรับทดสอบการทำงานของ logging system

BASE_URL="http://localhost:3001"

echo "🚀 Testing NestJS Loki Logger..."
echo "=================================="

# Test 1: Hello endpoint
echo "📝 Test 1: Hello endpoint"
curl -s "$BASE_URL/example" | jq .
echo ""

# Test 2: Performance test
echo "📝 Test 2: Performance test"
curl -s "$BASE_URL/example/performance" | jq .
echo ""

# Test 3: Create user
echo "📝 Test 3: Create user"
curl -s -X POST "$BASE_URL/example/users" \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 30}' | jq .
echo ""

# Test 4: Get user
echo "📝 Test 4: Get user by ID"
curl -s "$BASE_URL/example/users/123" | jq .
echo ""

# Test 5: Structured logging
echo "📝 Test 5: Structured logging test"
curl -s "$BASE_URL/example/structured" | jq .
echo ""

# Test 6: Error endpoint (จะ return error)
echo "📝 Test 6: Error endpoint (expected to fail)"
curl -s "$BASE_URL/example/error" | jq .
echo ""

echo "✅ All tests completed!"
echo "🔍 Check your Loki logs at http://localhost:3100"
echo "📊 View logs in Grafana at http://localhost:3000"
