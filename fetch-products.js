// Fetch and process the CSV data
const csvUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/product%20list%20and%20code%20-%20Sheet1-fvkG5KrLPLCd9vnHXgHxYBz6nSS4EM.csv';

async function fetchAndProcessProducts() {
    try {
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        
        // Parse CSV
        const lines = csvText.split('\n');
        const products = [];
        
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            
            // Handle CSV parsing with potential commas in product names
            const line = lines[i].trim();
            const firstCommaIndex = line.indexOf(',');
            
            if (firstCommaIndex === -1) continue;
            
            const code = line.substring(0, firstCommaIndex).trim().replace(/"/g, '');
            const name = line.substring(firstCommaIndex + 1).trim().replace(/"/g, '');
            
            if (code && name) {
                products.push({
                    code: code,
                    name: name
                });
            }
        }
        
        console.log(`Found ${products.length} products`);
        console.log('Sample products:');
        products.slice(0, 10).forEach(p => console.log(`${p.code}: ${p.name}`));
        
        return products;
    } catch (error) {
        console.error('Error fetching CSV:', error);
        return [];
    }
}

// Run the function
fetchAndProcessProducts().then(products => {
    console.log('\n=== JAVASCRIPT ARRAY FOR HTML ===');
    console.log('const products = ' + JSON.stringify(products, null, 2) + ';');
});