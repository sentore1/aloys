-- Create product_specs table
CREATE TABLE IF NOT EXISTS product_specs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  spec_name VARCHAR(255) NOT NULL,
  spec_value TEXT NOT NULL,
  spec_image TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE product_specs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Product specs are viewable by everyone" ON product_specs FOR SELECT USING (true);
CREATE POLICY "Admin can manage product specs" ON product_specs FOR ALL USING (true);

-- Create index for faster queries
CREATE INDEX idx_product_specs_product_id ON product_specs(product_id);
CREATE INDEX idx_product_specs_display_order ON product_specs(display_order);
