import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClientPaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [showVisaModal, setShowVisaModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await axios.get(`http://localhost:5000/api/payments/client/${userId}`);
      if (res.data.ok) setPayments(res.data.payments);
    };
    fetchPayments();
  }, [userId]);

  const processVisaPayment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/api/payments/pay`, {
        paymentId: selectedPayment.id, caseId: selectedPayment.case_id, clientId: userId, amount: selectedPayment.amount, method: 'VISA'
      });
      alert('Payment Successful! Case Activated.');
      setShowVisaModal(false);
      // تحديث الحالة محلياً
      setPayments(prev => prev.map(p => p.id === selectedPayment.id ? { ...p, status: 'Paid' } : p));
    } catch (err) { alert("Payment Error."); }
  };

  return (
    <div className="min-h-screen pt-28 bg-gray-50 px-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-3xl font-black uppercase mb-8">Pending <span className="text-yellow-500">Payments</span></h1>
        
        {payments.filter(p => p.status === 'Pending').map(payment => (
          <div key={payment.id} className="bg-white p-6 rounded-2xl flex justify-between items-center shadow-sm border">
            <h3 className="font-black text-lg">{payment.title}</h3>
            <div className="flex items-center gap-4">
              <span className="font-black text-xl">{payment.amount} EGP</span>
              <button onClick={() => { setSelectedPayment(payment); setShowVisaModal(true); }} className="bg-black text-white px-6 py-2 rounded-xl font-bold hover:bg-yellow-500 hover:text-black">Pay via VISA</button>
            </div>
          </div>
        ))}
      </div>

      {showVisaModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 p-8 rounded-[2rem] w-full max-w-sm border border-yellow-500/20 text-white">
            <h3 className="text-xl font-black mb-2 text-yellow-500">VISA Secure Checkout</h3>
            <p className="text-xs mb-6 opacity-50">VISA ONLY ACCEPTED</p>
            <form onSubmit={processVisaPayment} className="space-y-4">
              <input type="text" required placeholder="Cardholder Name" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none" />
              <input type="text" required pattern="4[0-9]{12}(?:[0-9]{3})?" placeholder="4000 1234 5678 9010" className="w-full bg-black/50 border border-white/10 p-4 rounded-xl outline-none" title="Must start with 4 (VISA)" />
              <div className="flex gap-4">
                <input type="text" required placeholder="MM/YY" className="w-1/2 bg-black/50 border border-white/10 p-4 rounded-xl outline-none" />
                <input type="password" required placeholder="CVV" className="w-1/2 bg-black/50 border border-white/10 p-4 rounded-xl outline-none" />
              </div>
              <button type="submit" className="w-full bg-yellow-500 text-black p-4 rounded-xl font-black mt-4">Confirm Payment</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default ClientPaymentPage;