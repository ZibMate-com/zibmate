export  const rooms = [
    { id: '101', type: 'Single', status: 'booked', tenant: 'Arjun M.', price: '₹12,000' },
    { id: '102', type: 'Double', status: 'available', tenant: null, price: '₹8,500' },
    { id: '103', type: 'Single', status: 'booked', tenant: 'Sneha K.', price: '₹12,000' },
    { id: '104', type: 'Suite', status: 'maintenance', tenant: null, price: '₹18,000' },
    { id: '105', type: 'Double', status: 'booked', tenant: 'Rahul V.', price: '₹8,500' },
    { id: '106', type: 'Double', status: 'available', tenant: null, price: '₹8,500' },
  ]; 

export  const tickets = [
    { id: 'TK-102', tenant: 'Arjun Mehra', room: '402', issue: 'AC making loud noise', date: '2h ago', priority: 'High', category: 'Electrical' },
    { id: 'TK-105', tenant: 'Sneha Kapoor', room: '105', issue: 'Bathroom tap leaking', date: '5h ago', priority: 'Medium', category: 'Plumbing' },
    { id: 'TK-108', tenant: 'Rahul Varma', room: '301', issue: 'Wifi signal weak', date: '1d ago', priority: 'Low', category: 'Technical' },
  ];