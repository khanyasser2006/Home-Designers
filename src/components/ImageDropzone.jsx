import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
const MAX_RAW_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB input limit
const MAX_IMAGE_DIMENSION = 1400; // Max width/height in px
const COMPRESSION_QUALITY = 0.85; // High fidelity JPEG compression

export default function ImageDropzone({
  label,
  value,
  onChange,
  aspectRatio = '16/10',
  description = 'Drag & drop image here, or browse (JPG, PNG, WEBP — auto-optimized)',
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file) => {
    setErrorMessage('');

    // 1. Validate File MIME Type (Block SVGs to prevent embedded script XSS)
    if (file.type === 'image/svg+xml') {
      setErrorMessage('SVG uploads are blocked for security (potential script injection). Please use JPG, PNG, or WEBP.');
      return;
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      setErrorMessage('Unsupported file format. Please upload a valid JPG, PNG, or WEBP image.');
      return;
    }

    // 2. Validate Raw File Size
    if (file.size > MAX_RAW_FILE_SIZE_BYTES) {
      setErrorMessage('File exceeds 10MB limit. Please select a smaller image.');
      return;
    }

    setIsProcessing(true);

    try {
      // 3. Client-Side Canvas Optimization & Compression Pipeline
      const compressedDataUrl = await compressImage(file);
      onChange(compressedDataUrl);
    } catch (err) {
      setErrorMessage('Failed to process image. The file may be corrupt.');
    } finally {
      setIsProcessing(false);
    }
  };

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          let { width, height } = img;

          // Proportional dimension bounding
          if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
            if (width > height) {
              height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
              width = MAX_IMAGE_DIMENSION;
            } else {
              width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
              height = MAX_IMAGE_DIMENSION;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Output clean compressed image/jpeg to prevent localStorage quota exhaustion
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', COMPRESSION_QUALITY);
          resolve(optimizedDataUrl);
        };
        img.onerror = reject;
        img.src = event.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onChange('');
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block font-mono text-xs text-text-muted uppercase font-bold">
          {label}
        </label>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFileSelect}
        className="hidden"
      />

      {errorMessage && (
        <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-700 text-xs font-mono flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {value ? (
        // Preview State with Remove/Replace Button
        <div className="relative rounded-md overflow-hidden border border-border-subtle bg-bg-secondary group shadow-sm">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img src={value} alt="Uploaded preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-graphite/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Action Overlay */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 rounded bg-bg-graphite/85 backdrop-blur-md text-text-light font-mono text-[10px] uppercase font-bold hover:bg-black transition-colors cursor-pointer"
            >
              Replace
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1 rounded bg-red-600/85 backdrop-blur-md text-white hover:bg-red-700 transition-colors cursor-pointer"
              title="Remove image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="absolute bottom-3 left-3 bg-bg-graphite/85 backdrop-blur-md px-2.5 py-1 rounded text-text-light font-mono text-[10px] flex items-center gap-1.5 font-semibold">
            <CheckCircle2 className="w-3 h-3 text-green-400" />
            <span>Image Attached (Optimized)</span>
          </div>
        </div>
      ) : (
        // Dropzone Area
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center space-y-2 ${
            isDragging
              ? 'border-bg-graphite bg-bg-elevated shadow-md scale-[1.01]'
              : 'border-border-subtle hover:border-border-graphite bg-bg-primary hover:bg-bg-elevated'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center text-text-secondary border border-border-subtle">
            {isProcessing ? (
              <Loader2 className="w-5 h-5 text-accent-ochre animate-spin" />
            ) : (
              <UploadCloud className="w-5 h-5 text-accent-ochre" />
            )}
          </div>

          <div className="space-y-0.5">
            <span className="font-mono text-xs font-bold text-text-primary block">
              {isProcessing ? (
                'Optimizing & Compressing Image...'
              ) : (
                <>
                  Drag & Drop Image Here, or <span className="text-accent-ochre underline">Browse</span>
                </>
              )}
            </span>
            <p className="font-sans text-[11px] text-text-muted">
              {description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
