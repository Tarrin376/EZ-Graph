
export function parseJsonFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
  
        reader.onload = function(event) {
            try {
                // Convert JSON data to a JavaScript object
                const jsonData = JSON.parse(event.target.result);
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        };
        
        // If an error occurs, throw it
        reader.onerror = function(error) {
            reject(error);
        };
  
        reader.readAsText(file);
    });
}