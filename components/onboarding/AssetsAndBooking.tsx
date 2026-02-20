
import React, { useState, useRef } from 'react';
import { Upload, X, File, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { FileUpload } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  files: FileUpload[];
  updateFiles: (files: FileUpload[]) => void;
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const AssetsAndBooking: React.FC<Props> = ({ files, updateFiles, onBack, onSubmit, isLoading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const uploadedFiles = Array.from(e.dataTransfer.files).map((f: File) => ({
        name: f.name, size: f.size, type: f.type, url: '#'
      }));
      updateFiles([...files, ...uploadedFiles]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files).map((f: File) => ({
        name: f.name, size: f.size, type: f.type, url: '#'
      }));
      updateFiles([...files, ...uploadedFiles]);
    }
  };

  const removeFile = (index: number) => updateFiles(files.filter((_, i) => i !== index));

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getCalendlyUrl = () => {
    const baseUrl = "https://calendly.com/your-username/30min?embed_type=Inline";
    try {
      if (typeof window !== 'undefined' && window.location?.hostname) {
        return `${baseUrl}&embed_domain=${window.location.hostname}`;
      }
    } catch (_) { }
    return baseUrl;
  };

  return (
    <div className="space-y-12 max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold mb-2">Final Step: Assets & Strategy Call</h2>
        <p className="text-gray-400 text-lg">Upload any relevant files and lock in your onboarding call</p>
      </div>

      {/* File Upload */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-[#3191C4]/15 flex items-center justify-center">
            <Upload className="w-4 h-4 text-[#3191C4]" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Upload Relevant Files</h3>
            <p className="text-gray-500 text-sm">Brand assets, briefs, wireframes, logos — anything helpful</p>
          </div>
        </div>

        <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileSelect} />

        <motion.div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleFileDrop}
          onClick={() => fileInputRef.current?.click()}
          animate={{ borderColor: isDragging ? '#3191C4' : 'rgba(255,255,255,0.1)' }}
          className={`
            border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300
            ${isDragging ? 'bg-[#3191C4]/8 border-[#3191C4]' : 'bg-white/3 hover:bg-white/5 hover:border-white/20'}
          `}
        >
          <div className={`w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center transition-colors ${isDragging ? 'bg-[#3191C4]/25' : 'bg-white/6'}`}>
            <Upload className={`w-8 h-8 transition-colors ${isDragging ? 'text-[#3191C4]' : 'text-gray-500'}`} />
          </div>
          <p className="text-base font-semibold mb-1">Drag files here or <span className="text-[#3191C4]">click to browse</span></p>
          <p className="text-gray-500 text-sm">Images, PDFs, Docs, ZIPs — up to 10 MB each</p>
        </motion.div>

        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3"
            >
              {files.map((file, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-card p-4 rounded-2xl flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#3191C4]/15 flex items-center justify-center shrink-0">
                      <File className="w-4 h-4 text-[#3191C4]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatSize(file.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                    className="p-1.5 rounded-lg hover:bg-red-500/15 hover:text-red-400 text-gray-600 transition-all shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="h-px bg-white/8" />

      {/* Calendly */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-[#6C47FF]/15 flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-[#6C47FF]" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Schedule Your Strategy Call</h3>
            <p className="text-gray-500 text-sm">Pick a time that works for you — 30 minutes</p>
          </div>
        </div>

        <div className="glass-card rounded-3xl overflow-hidden border-white/5 flex items-center justify-center min-h-[380px] relative">
          {/* Placeholder overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3191C4]/8 to-[#6C47FF]/8 flex flex-col items-center justify-center p-10 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3191C4] to-[#6C47FF] flex items-center justify-center mb-5 float-anim">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <p className="text-xl font-bold mb-2">Calendly Booking Widget</p>
            <p className="text-gray-400 text-sm max-w-sm">In production, your live Calendly calendar will appear here so clients can book directly.</p>
          </div>
          <iframe src={getCalendlyUrl()} width="100%" height="380" frameBorder="0" className="opacity-0" />
        </div>
      </section>

      <div className="flex justify-between items-center pt-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <motion.button
          onClick={onSubmit}
          disabled={isLoading}
          whileHover={!isLoading ? { scale: 1.04 } : {}}
          whileTap={!isLoading ? { scale: 0.96 } : {}}
          className={`
            inline-flex items-center gap-3 px-12 py-4 rounded-2xl font-bold text-base transition-all
            ${isLoading
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#3191C4] to-[#6C47FF] text-white blue-glow hover:brightness-110'}
          `}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              Complete Onboarding
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default AssetsAndBooking;
