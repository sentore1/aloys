-- Example SEO keywords for different product categories at Itech

-- DRESSES
-- Keywords: luxury dresses, designer evening gowns, elegant cocktail dress, formal wear, silk dresses, premium evening wear, high-end party dress, sophisticated gowns, designer formal dress, exclusive evening wear

-- TOPS
-- Keywords: luxury blouses, designer shirts, premium tops, silk blouse, cashmere sweater, high-end knitwear, elegant tops, designer casual wear, luxury t-shirts, premium fashion tops

-- BOTTOMS
-- Keywords: designer pants, luxury trousers, premium jeans, high-end skirts, elegant bottoms, designer denim, luxury wide-leg pants, sophisticated trousers, premium culottes, designer shorts

-- ACCESSORIES
-- Keywords: luxury handbags, designer bags, premium leather goods, high-end accessories, elegant jewelry, designer scarves, luxury belts, premium sunglasses, exclusive accessories, designer wallets

-- GENERAL BRAND KEYWORDS
-- Itech, Itech fashion, Itech clothing, Itech luxury, Itech designer, Itech brand, Itech collection, Itech store, shop Itech, Itech online

-- QUALITY & STYLE KEYWORDS
-- luxury fashion, high-end clothing, designer wear, premium apparel, exclusive fashion, sophisticated style, elegant design, timeless pieces, modern luxury, contemporary fashion, minimalist luxury, refined style

-- OCCASION KEYWORDS
-- evening wear, cocktail attire, formal fashion, casual luxury, office wear, weekend style, special occasion, party dress, business casual, elegant everyday

-- MATERIAL KEYWORDS
-- silk clothing, cashmere wear, leather goods, premium cotton, luxury fabrics, designer materials, high-quality textiles, fine materials

-- Update products with category-specific keywords
UPDATE products SET seo_keywords = 'luxury dresses, designer evening gowns, elegant cocktail dress, formal wear, silk dresses, premium evening wear, high-end party dress, Itech dresses, ' || name WHERE category = 'dresses';

UPDATE products SET seo_keywords = 'luxury blouses, designer shirts, premium tops, silk blouse, cashmere sweater, high-end knitwear, elegant tops, Itech tops, ' || name WHERE category = 'tops';

UPDATE products SET seo_keywords = 'designer pants, luxury trousers, premium jeans, high-end skirts, elegant bottoms, designer denim, Itech bottoms, ' || name WHERE category = 'bottoms';

UPDATE products SET seo_keywords = 'luxury handbags, designer bags, premium leather goods, high-end accessories, elegant jewelry, designer scarves, Itech accessories, ' || name WHERE category = 'accessories';
