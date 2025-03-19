'use client';
import { uploadPDF } from '@/actions/uploadPDF';
import { useUser } from '@clerk/nextjs';
import { DndContext, useSensor, useSensors, PointerSensor} from '@dnd-kit/core';
import { useSchematicEntitlement } from '@schematichq/schematic-react';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useState, useRef } from 'react';

function PDFDropzone() {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [isDraggingOver, setIsDraggingOver] = useState(false);
    const {user} = useUser();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const {value: isFeatureEnabled, featureUsageExceeded, featureUsage, featureAllocation} = useSchematicEntitlement('scans');

    console.log("isFeatureEnabled", isFeatureEnabled, "featureUsageExceeded");
    console.log("Feature Usage", featureUsage);
    console.log("Feature Allocation", featureAllocation);

    // Set up sensors for drag detection
    const sensors = useSensors(useSensor(PointerSensor));
  
    const handleUpload = useCallback(async (files: FileList | File[]) => {

        if (!user) {
            alert("Please sign in to upload files");
            return;
        }
        //filter out only pdf files
        const pdfFiles = Array.from(files).filter((file) => file.type === 'application/pdf' 
        || file.name.endsWith('.pdf'));
        if (pdfFiles.length === 0) {
            alert("Please select a PDF file to upload");
            return;
        }

        setIsUploading(true);
        try {
              const newUploadedFiles: string[] = [];

              for (const file of pdfFiles) {
                const formData = new FormData();
                formData.append('file', file);

                const result = await uploadPDF(formData);

                if (!result.success) {
                    throw new Error(result.error);
                }
                newUploadedFiles.push(file.name);
              }
              setUploadedFiles((prevFiles) => [...prevFiles, ...newUploadedFiles]);

              //clear after 5 seconds
              setTimeout(() => {
                setUploadedFiles([]);
              }, 5000);

              router.push('/receipts');
        }catch (error) {
            console.error("Error uploading files", error);
            alert("Error uploading files. Please try again.");
        } finally {
            setIsUploading(false);
        }
        
    }, [user, router])


    const handleDragOver = useCallback((e: React.DragEvent)=> {
        e.preventDefault();
        setIsDraggingOver(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent)=> {
        e.preventDefault();
        setIsDraggingOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent)=> {
        e.preventDefault();
        setIsDraggingOver(false);

        if (!user) {
            alert("Please sign in to upload files");
            return;
        }

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleUpload(e.dataTransfer.files);
        }

        
    }, [user, handleUpload]);

    //const canUpload = true;
    const isUserSignedIn  = !!user;
    const canUpload = isUserSignedIn && isFeatureEnabled;
    return (
      <DndContext sensors={sensors}>
        <div className="w-full max-w-md mx-auto bg-red-400">
          <div
            onDragOver={canUpload ? handleDragOver : undefined}
            onDragLeave={canUpload ? handleDragLeave : undefined}
            onDrop={canUpload ? handleDrop : (e) => e.preventDefault()}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDraggingOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } ${!canUpload ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {/* Content goes here */}
          </div>
        </div>
      </DndContext>
    );
  }
  
 
  
export default PDFDropzone