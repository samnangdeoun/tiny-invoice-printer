import React, { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { InvoiceData } from "@/types/invoice";
import { useReactToPrint } from "react-to-print";
import { Printer } from "lucide-react";

interface InvoicePreviewProps {
  invoice: InvoiceData;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoice }) => {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    documentTitle: `Invoice-${invoice.invoiceNumber}`,
    pageStyle: `
    @page {
      size: 80mm auto;
      margin: 0;
    }
    body {
      margin: 0;
    }
  `,
    contentRef: invoiceRef,
    onPrintError: (error) => console.error("Print failed:", error),
    onAfterPrint: () => console.log("Print completed"),
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <div className="glass-panel p-6 md:p-8 ">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-medium text-slate-900">Preview</h2>
          <Button onClick={handlePrint} className="group">
            <Printer className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
            Print
          </Button>
        </div>

        {/* Invoice Content */}
        <div
          className="thermal-paper mx-auto noto-sans-khmer-regular"
          ref={invoiceRef}
        >
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold uppercase">
              {invoice.businessName}
            </h2>
            <p className="text-xs">{invoice.businessAddress}</p>
            <p className="text-xs">លេខទំនាក់ទំនង / Phone</p>
            <p className="text-xs">{invoice.businessPhone}</p>
          </div>

          <div className="text-xs mb-4">
            {/* <div className="flex justify-between">
              <span>វិកយបត្រ #</span>
              <span>{invoice.invoiceNumber}</span>
            </div> */}
            <div className="flex justify-between mb-2">
              <span>
                កាលបរិច្ឆេទ៖
                <br />
                Date
              </span>
              <span>{new Date(invoice.date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>
                អតិថិជន៖
                <br />
                Customer
              </span>
              <span>{invoice.customerName}</span>
            </div>
          </div>

          <div className="text-xs mb-4 noto-sans-khmer-regular">
            <div className="border-b border-dashed border-gray-300 mb-2 pb-1">
              <div className="grid grid-cols-12">
                <div className="col-span-5 font-medium">ឈ្មោះទំនិញ</div>
                <div className="col-span-2 font-medium text-right">ចំនួន</div>
                <div className="col-span-2 font-medium text-right">តម្លៃ</div>
                <div className="col-span-3 font-medium text-right">
                  សរុបតម្លៃ
                </div>
              </div>
            </div>

            {invoice.items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 mb-1">
                <div className="col-span-5">{item.description}</div>
                <div className="col-span-2 text-right">{item.quantity}</div>
                <div className="col-span-2 text-right">
                  {formatCurrency(item.price)}
                </div>
                <div className="col-span-3 text-right">
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs border-t border-dashed border-gray-300 pt-2 mb-4">
            <div className="flex justify-between">
              <span>
                សរុបរង៖
                <br />
                SubTotal
              </span>
              <span>{formatCurrency(invoice.subtotal)}</span>
            </div>
            {invoice.taxAmount > 0 && (
              <div className="flex justify-between">
                <span>អាករ({invoice.taxRate}%)៖</span>
                <span>{formatCurrency(invoice.taxAmount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold mt-2">
              <span>
                សរុប៖
                <br />
                Total
              </span>
              <span>{formatCurrency(invoice.total)}</span>
            </div>
          </div>

          <div className="text-center text-xs mt-6 pt-4 border-t border-dashed border-gray-300">
            <p className="moul-regular">សូមអរគុណសម្រាប់ការគាំទ្រ</p>
            <p>{`[FACEBOOK/TELEGRAM] : @ws_we_sale`}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InvoicePreview;
