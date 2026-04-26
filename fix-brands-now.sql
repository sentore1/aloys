-- Fix brands table - allow all operations
CREATE POLICY "Allow all operations on brands" 
ON brands 
FOR ALL 
USING (true) 
WITH CHECK (true);
