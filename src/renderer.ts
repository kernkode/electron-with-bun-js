// Solo importa o usa directamente - los tipos ya están disponibles
window.electronAPI.sendMessage('app-loaded', { version: '1.0.0' });

window.electronAPI.onMessage('from-main', (data) => {
    console.log('Mensaje del proceso principal:', data);
});