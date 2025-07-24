#!/bin/bash

echo "Testing Brand Profile Creation with Array Fields..."

# Test data with JSON arrays as strings (mimicking form-data)
curl -X POST http://localhost:3000/brand-profiles \
  -H "Content-Type: multipart/form-data" \
  -H "Authorization: Bearer test-token" \
  -F 'companyName=Test Fashion Inc.' \
  -F 'industry=Fashion' \
  -F 'targetAudience=["young adults","fashion enthusiasts","eco-conscious"]' \
  -F 'monthlyBudget=50000' \
  -F 'description=A test fashion brand' \
  -F 'website=https://testfashion.com' \
  -F 'location=New York, NY' \
  -F 'teamSize=50-100 employees'

echo -e "\n\nTesting Creator Profile Creation with Array Fields..."

# Test data with JSON arrays as strings (mimicking form-data)
curl -X POST http://localhost:3000/creator-profiles \
  -H "Content-Type: multipart/form-data" \
  -H "Authorization: Bearer test-token" \
  -F 'name=John Doe' \
  -F 'bio=Passionate content creator' \
  -F 'platformStats=[{"platform":"instagram","followers":10000,"engagementRate":5.2,"avgViews":1500}]' \
  -F 'niches=["lifestyle","fashion","travel"]' \
  -F 'location=New York, NY' \
  -F 'website=https://johndoe.com' \
  -F 'baseRate=500'
