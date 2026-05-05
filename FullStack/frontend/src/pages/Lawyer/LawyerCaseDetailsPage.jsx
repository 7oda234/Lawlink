import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LawyerCaseDetailsPage = () => {
  const { id } = useParams();
  const lawyerId = localStorage.getItem('userId');
  const [caseData, setCaseData] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const caseRes = await axios.get(`http://localhost:5000/api/cases/${id}`);
      if (caseRes.data.ok) setCaseData(caseRes.data.case);
      const docsRes = await axios.get(`http://localhost:5000/api/documents/case/${id}`);
      if (docsRes.data) setDocuments(docsRes.data);
    };
    fetchData();
  }, [id]);

  const handleUploadDoc = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('documents', file);
    formData.append('case_id', id);
    formData.append('user_id', lawyerId);
    await axios.post('http://localhost:5000/api/documents/upload', formData);
    alert("تم رفع المستند!");
    setFile(null);
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/appointments', {
      appointment_date: appointmentDate, client_id: caseData.client_id, lawyer_id: lawyerId, case_id: id
    });
    alert("تم حجز الموعد بنجاح!");
  };

  if (!caseData) return null;

  return (
    <div className="min-h-screen pt-28 bg-gray-50 px-6">
      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-black uppercase mb-2 inline-block">{caseData.status}</span>
            <h1 className="text-3xl font-black uppercase">{caseData.title}</h1>
          </div>
          
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-black uppercase mb-4">Documents</h3>
            <div className="space-y-2 mb-6">
              {documents.map(doc => (
                <div key={doc.document_id} className="p-4 bg-gray-50 rounded-xl border flex justify-between">
                  <p className="font-bold text-sm">{doc.file_path.split('/').pop()}</p>
                  <a href={`http://localhost:5000/${doc.file_path}`} target="_blank" className="text-yellow-500 text-xs font-black uppercase">Download</a>
                </div>
              ))}
            </div>
            <form onSubmit={handleUploadDoc} className="flex gap-4">
              <input type="file" required onChange={e => setFile(e.target.files[0])} className="flex-1" />
              <button type="submit" className="bg-black text-white px-6 py-2 rounded-xl font-black hover:bg-yellow-500 hover:text-black">Upload</button>
            </form>
          </div>
        </div>

        <div className="bg-black text-white p-8 rounded-[2rem]">
          <h3 className="text-xl font-black uppercase text-yellow-500 mb-6">Schedule Appointment</h3>
          <form onSubmit={handleBookAppointment} className="space-y-4">
            <input type="datetime-local" required className="w-full bg-white/10 p-4 rounded-xl border border-white/10 outline-none" onChange={e => setAppointmentDate(e.target.value)} />
            <button type="submit" className="w-full bg-yellow-500 text-black font-black p-4 rounded-xl">Book Meeting</button>
          </form>
        </div>
      </main>
    </div>
  );
};
export default LawyerCaseDetailsPage;