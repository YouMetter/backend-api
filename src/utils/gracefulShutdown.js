const gracefulShutdown = async (pool) => {
    console.log('\nShutting down server...');
    try {
        await pool.end();
        console.log('Database connections closed.');
    } catch (error) {
        console.log('Error closing pool:', error);
    } finally {
        process.exit(0);
    }
}

export {
    gracefulShutdown
}