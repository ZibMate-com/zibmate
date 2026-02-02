const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || '65646yugyftcgh987wew22';
const BASE_URL = 'http://localhost:3000';

const tokens = {
    admin: jwt.sign({ id: 1, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' }),
    owner: jwt.sign({ id: 2, role: 'owner' }, JWT_SECRET, { expiresIn: '1h' }),
    tenant: jwt.sign({ id: 3, role: 'user' }, JWT_SECRET, { expiresIn: '1h' }) // Using 'user' based on typical role names, checked login route which returns role from DB. Assuming 'user' or 'tenant'. Code checks for 'owner' or 'admin', sometimes just auth.
};

// Helper for requests
async function request(method, path, token, body = null) {
    console.log(`\nTesting ${method} ${path}...`);
    try {
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const options = { method, headers };
        if (body) options.body = JSON.stringify(body);

        const res = await fetch(`${BASE_URL}${path}`, options);
        const data = await res.json().catch(() => ({}));

        console.log(`Status: ${res.status}`);
        // console.log('Response:', JSON.stringify(data, null, 2));
        return { status: res.status, data };
    } catch (error) {
        console.error('Request failed:', error.message);
        return { status: 500, error };
    }
}

async function runTests() {
    console.log('Starting API Tests...');

    // 1. Test Tenant Request Creation (Requires Login)
    // Need a valid PG ID. Assuming 1 exists.
    const tenantReq = await request('POST', '/api/requests/tenant/create', tokens.tenant, {
        pg_id: 1,
        full_name: 'Test Tenant',
        email: 'tenant@test.com',
        phone: '1234567890'
    });

    // 2. Admin: Get Tenant Requests
    const tenantRequests = await request('GET', '/api/requests/tenant', tokens.admin);

    if (tenantReq.status === 201 && tenantReq.data.requestID) {
        const reqId = tenantReq.data.requestID;
        console.log(`Created Tenant Request ID: ${reqId}`);

        // 3. Admin: Update Status
        await request('PUT', `/api/requests/${reqId}/status`, tokens.admin, { status: 'approved' });

        // 4. Admin: Send Mail (Using mocked logic mostly, checking endpoint)
        // Only works if request exists.
        await request('POST', `/api/requests/sendmail/${reqId}`, tokens.admin);
    }

    // 5. Test Owner Request Creation
    const ownerReq = await request('POST', '/api/requests/owner/create', tokens.owner, {
        full_name: 'Test Owner',
        email: 'owner@test.com',
        phone: '9876543210',
        city: 'Test City',
        state: 'Test State'
    });

    // 6. Admin/Owner: Get Owner Requests
    await request('GET', '/api/requests/owner', tokens.owner);

    // 7. Owner: Get My PGs
    await request('GET', '/api/pg/my-pgs', tokens.owner);

    // 8. Owner: Get Owner Bookings
    await request('GET', '/api/bookings/owner-bookings', tokens.owner);

    console.log('\nTests Completed.');
}

// Wait a bit for server to be fully ready if called immediately
setTimeout(runTests, 2000);
