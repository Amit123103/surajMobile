-- Supabase Schema for Suraj Mobile Application

-- 1. Phones Table
CREATE TABLE IF NOT EXISTS public.phones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    storage TEXT NOT NULL,
    price NUMERIC NOT NULL DEFAULT 0,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Accessories Table
CREATE TABLE IF NOT EXISTS public.accessories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price NUMERIC NOT NULL DEFAULT 0,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Glass Table
CREATE TABLE IF NOT EXISTS public.glass (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    price NUMERIC NOT NULL DEFAULT 0,
    "isOutOfStock" BOOLEAN DEFAULT FALSE,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Repairs Table
CREATE TABLE IF NOT EXISTS public.repairs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    time TEXT NOT NULL,
    details TEXT,
    price NUMERIC NOT NULL DEFAULT 0,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Printing Table
CREATE TABLE IF NOT EXISTS public.printing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "serviceName" TEXT NOT NULL,
    description TEXT,
    "paperSize" TEXT NOT NULL,
    price NUMERIC NOT NULL DEFAULT 0,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
    id TEXT PRIMARY KEY DEFAULT 'shop',
    "isShopOpen" BOOLEAN DEFAULT TRUE,
    "openTime" TEXT DEFAULT '10:00',
    "closeTime" TEXT DEFAULT '23:00',
    "isDeliveryAvailable" BOOLEAN DEFAULT TRUE,
    "adminPhone" TEXT DEFAULT '+91 7492892235',
    "adminEmail" TEXT DEFAULT 'doctorsurajmobile@gmail.com',
    "store1Name" TEXT DEFAULT 'Green Valley',
    "store1Address" TEXT DEFAULT 'Main Market Area',
    "store2Name" TEXT DEFAULT 'Law Gate',
    "store2Address" TEXT DEFAULT 'University Road',
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings row
INSERT INTO public.settings (id, "isShopOpen", "openTime", "closeTime", "isDeliveryAvailable", "adminPhone", "adminEmail", "store1Name", "store1Address", "store2Name", "store2Address")
VALUES ('shop', TRUE, '10:00', '23:00', TRUE, '+91 7492892235', 'doctorsurajmobile@gmail.com', 'Green Valley', 'Main Market Area', 'Law Gate', 'University Road')
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (RLS) and Allow Public Read/Write for demo/anon access
ALTER TABLE public.phones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accessories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.glass ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repairs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.printing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public full access to phones" ON public.phones FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public full access to accessories" ON public.accessories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public full access to glass" ON public.glass FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public full access to repairs" ON public.repairs FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public full access to printing" ON public.printing FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public full access to settings" ON public.settings FOR ALL USING (true) WITH CHECK (true);

-- Enable Storage Bucket for product-images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Product Images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Public Insert Product Images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images');
