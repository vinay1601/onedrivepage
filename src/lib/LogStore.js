let logs = [];

export function addLog(log) {
    logs.push({ ...log, timestamp: new Date().toISOString() });
}

export function getLogs() {
    return logs;
}
