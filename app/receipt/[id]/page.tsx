"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { ChevronLeft, FileText } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Receipt() {
  const params = useParams<{ id: string }>();
  const [receiptId, setReceiptId] = useState<Id<"receipts"> | null>(null);
  const router = useRouter();

  const receipt = useQuery(
    api.receipts.getReceiptById,
    receiptId ? { id: receiptId } : "skip",
  );

  //Get the file download url
  const fileId = receipt?.fileId;
  const downloadUrl = useQuery(
    api.receipts.getReceiptDownloadUrl,
    fileId ? { fileId } : "skip",
  );

  // Convert the URL string ID to a Convex ID
  useEffect(() => {
    try {
      const id = params.id as Id<"receipts">;
      setReceiptId(id);
    } catch (error) {
      console.error("Invalid receipt ID:", error);
      router.push("/");
    }
  }, [params.id, router]);

  if (receipt === undefined) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (receipt === null) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Receipt Not Found</h1>
          <p className="mb-6">
            The receipt you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  // Format upload date
  const uploadDate = new Date(receipt.uploadedAt).toLocaleString();

  // Check if receipt has extracted data
  const hasExtractedData = !!(
    receipt.merchantName ||
    receipt.merchantAddress ||
    receipt.transactionDate ||
    receipt.transactionAmount
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <Link
            href="/receipts"
            className="text-blue-500 hover:underline flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Receipts
          </Link>
        </nav>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                {receipt.fileDisplayName || receipt.fileName}
              </h1>
            </div>
            <div className="flex items-center">
              {receipt.status === "pending" ? (
                <div className="mr-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-800"></div>
                </div>
              ) : null}
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  receipt.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : receipt.status === "processed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {receipt.status.charAt(0).toUpperCase() +
                  receipt.status.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Info Column */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500">
                  File Information
                </h3>
                <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Uploaded</p>
                      <p className="font-medium">{uploadDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Size</p>
                      <p className="font-medium">
                        {formatFileSize(receipt.size)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Type</p>
                      <p className="font-medium">{receipt.mimeType}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">ID</p>
                      <p className="font-medium truncate" title={receipt._id}>
                        {receipt._id.slice(0, 10)}...
                      </p>
                    </div>
                  </div>
                </div>
                {/* Download */}
                <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-blue-500 mx-auto" />
                    <p className="mt-4 text-sm text-gray-500">PDF Preview</p>
                    {downloadUrl && (
                      <a
                        href={downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 inline-block"
                      >
                        View PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Extracted Data Section */}
          {hasExtractedData && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Receipt Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Merchant Details */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-3">
                    Merchant Information
                  </h4>
                  <div className="space-y-2">
                    {receipt.merchantName && (
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{receipt.merchantName}</p>
                      </div>
                    )}
                    {receipt.merchantAddress && (
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">{receipt.merchantAddress}</p>
                      </div>
                    )}
                    {receipt.merchantContact && (
                      <div>
                        <p className="text-sm text-gray-500">Contact</p>
                        <p className="font-medium">{receipt.merchantContact}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Transaction Details */}
              </div>
            </div>
          )}
          {/* End of Extracted Data Section */}
        </div>
      </div>
    </div>
  );
}

export default Receipt;

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Helper function to format currency
function formatCurrency(amount: number, currency: string = ""): string {
  return `${amount.toFixed(2)}${currency ? ` ${currency}` : ""}`;
}
