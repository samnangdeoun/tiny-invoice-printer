
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import InvoiceForm from '@/components/InvoiceForm';
import InvoicePreview from '@/components/InvoicePreview';
import { InvoiceData } from '@/types/invoice';

const Index = () => {
  const [invoice, setInvoice] = useState<InvoiceData>({
    businessName: 'Your Business Name',
    businessAddress: '123 Business St',
    businessPhone: '(123) 456-7890',
    invoiceNumber: '001',
    date: new Date().toISOString().split('T')[0],
    customerName: 'Customer Name',
    items: [{ description: 'Item 1', price: 10.00, quantity: 1 }],
    taxRate: 0,
    taxAmount: 0,
    subtotal: 10.00,
    total: 10.00,
  });

  const handleUpdateInvoice = (updatedInvoice: InvoiceData) => {
    setInvoice(updatedInvoice);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full mb-4"
          >
            80mm Thermal Paper
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl"
          >
            Thermal Receipt Printer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Create and print beautiful invoices for 80mm thermal printers.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InvoiceForm onUpdateInvoice={handleUpdateInvoice} />
          <InvoicePreview invoice={invoice} />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
