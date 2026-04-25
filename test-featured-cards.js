// Test script to verify featured_cards table
// Run this in browser console on your site

async function testFeaturedCards() {
  console.log('Testing featured_cards...')
  
  try {
    const response = await fetch('https://your-supabase-url.supabase.co/rest/v1/featured_cards?enabled=eq.true&order=position', {
      headers: {
        'apikey': 'your-anon-key',
        'Authorization': 'Bearer your-anon-key'
      }
    })
    
    const data = await response.json()
    console.log('Featured cards data:', data)
    
    if (data.length === 0) {
      console.error('❌ No featured cards found in database')
    } else {
      console.log('✅ Found', data.length, 'featured card(s)')
      console.log('First card:', data[0])
    }
  } catch (error) {
    console.error('❌ Error fetching featured cards:', error)
  }
}

testFeaturedCards()
