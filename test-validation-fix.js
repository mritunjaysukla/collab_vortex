// This is a simple test file to verify the validation fixes
// You can use this to test the API endpoints manually

const testData = {
  creatorProfile: {
    name: 'John Doe',
    bio: 'Content creator',
    platformStats: JSON.stringify([
      {
        platform: 'instagram',
        followers: 10000,
        engagementRate: 5.2,
        avgViews: 1500,
      },
      {
        platform: 'youtube',
        followers: 25000,
        engagementRate: 3.8,
        avgViews: 5000,
      }
    ]),
    niches: JSON.stringify(['lifestyle', 'fashion', 'travel']),
    location: 'New York, NY',
    website: 'https://johndoe.com',
    baseRate: 500
  },

  brandProfile: {
    companyName: 'Fashion Forward Inc.',
    industry: 'Fashion & Lifestyle',
    teamSize: '50-100 employees',
    description: 'Leading fashion brand focusing on sustainable clothing',
    website: 'https://fashionforward.com',
    location: 'New York, NY',
    targetAudience: JSON.stringify(['young adults', 'fashion enthusiasts', 'eco-conscious']),
    monthlyBudget: 50000
  }
};

console.log('Test data for creator profile:', testData.creatorProfile);
console.log('Test data for brand profile:', testData.brandProfile);

// Instructions:
// 1. Use this data to test POST /creator-profiles with form data
// 2. Use this data to test POST /brand-profiles with form data
// 3. Verify that arrays are properly handled and no validation errors occur
