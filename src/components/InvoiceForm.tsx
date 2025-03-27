
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { X, Plus, Calendar, Trash2 } from 'lucide-react';
import { InvoiceData } from '@/types/invoice';

interface InvoiceFormProps {
  onUpdateInvoice: (invoice: InvoiceData) => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onUpdateInvoice }) => {
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

  const updateInvoice = (updates: Partial<InvoiceData>) => {
    const updatedInvoice = { ...invoice, ...updates };
    
    // Calculate subtotal
    const subtotal = updatedInvoice.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    
    // Calculate tax
    const taxAmount = subtotal * (updatedInvoice.taxRate / 100);
    
    // Calculate total
    const total = subtotal + taxAmount;
    
    const finalInvoice = {
      ...updatedInvoice,
      subtotal,
      taxAmount,
      total,
    };
    
    setInvoice(finalInvoice);
    onUpdateInvoice(finalInvoice);
  };

  const addItem = () => {
    const newItems = [
      ...invoice.items,
      { description: `Item ${invoice.items.length + 1}`, price: 0, quantity: 1 },
    ];
    updateInvoice({ items: newItems });
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...invoice.items];
    newItems[index] = {
      ...newItems[index],
      [field]: field === 'description' ? value : parseFloat(value as string) || 0,
    };
    updateInvoice({ items: newItems });
  };

  const removeItem = (index: number) => {
    const newItems = [...invoice.items];
    newItems.splice(index, 1);
    updateInvoice({ items: newItems });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel p-6 md:p-8"
    >
      <h2 className="text-2xl font-medium text-slate-900 mb-6">Invoice Details</h2>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                value={invoice.businessName}
                onChange={(e) => updateInvoice({ businessName: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="businessAddress">Business Address</Label>
              <Input
                id="businessAddress"
                value={invoice.businessAddress}
                onChange={(e) => updateInvoice({ businessAddress: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="businessPhone">Business Phone</Label>
              <Input
                id="businessPhone"
                value={invoice.businessPhone}
                onChange={(e) => updateInvoice({ businessPhone: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={(e) => updateInvoice({ invoiceNumber: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <div className="relative mt-1">
                <Input
                  id="date"
                  type="date"
                  value={invoice.date}
                  onChange={(e) => updateInvoice({ date: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="customerName">Customer Name</Label>
              <Input
                id="customerName"
                value={invoice.customerName}
                onChange={(e) => updateInvoice({ customerName: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-slate-900">Items</h3>
          </div>
          
          <div className="space-y-4">
            {invoice.items.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 sm:col-span-5">
                      <Label htmlFor={`item-description-${index}`}>Description</Label>
                      <Input
                        id={`item-description-${index}`}
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <Label htmlFor={`item-quantity-${index}`}>Quantity</Label>
                      <Input
                        id={`item-quantity-${index}`}
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                        min="1"
                        step="1"
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <Label htmlFor={`item-price-${index}`}>Price</Label>
                      <Input
                        id={`item-price-${index}`}
                        type="number"
                        value={item.price}
                        onChange={(e) => updateItem(index, 'price', e.target.value)}
                        min="0"
                        step="0.01"
                        className="mt-1"
                      />
                    </div>
                    <div className="col-span-12 sm:col-span-1 flex items-end justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(index)}
                        className="h-9 w-9"
                        disabled={invoice.items.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button
              variant="outline"
              onClick={addItem}
              className="w-full justify-center mt-2"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Item
            </Button>
          </div>
        </div>
        
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                value={invoice.taxRate}
                onChange={(e) => updateInvoice({ taxRate: parseFloat(e.target.value) || 0 })}
                min="0"
                step="0.1"
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InvoiceForm;
