
export function updateGraphLocalStorage(updatedData, networkName) {
    // Parse graphs from local storage to JavaScript objects
    const graphs = JSON.parse(localStorage.getItem("graphs")) || [];

    // Update the local storage with the updated graphs
    localStorage.setItem("graphs", JSON.stringify([...graphs.map((x) => {
        if (x.networkName !== networkName) return x;
        else return {
            ...x,
            ...updatedData
        }
    })]));
}