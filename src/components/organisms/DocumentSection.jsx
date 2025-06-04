import { useState } from 'react'
import { toast } from 'react-toastify'
import { 
  Upload, 
  FileText, 
  Download, 
  Eye, 
  Trash2, 
  Plus,
  Calendar,
  User,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

function DocumentSection() {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'PAN Card',
      type: 'Identity',
      fileName: 'pan_card_john_doe.pdf',
      uploadDate: '2024-01-15',
      status: 'verified',
      size: '256 KB'
    },
    {
      id: 2,
      name: 'Aadhar Card',
      type: 'Identity',
      fileName: 'aadhar_card_john_doe.pdf',
      uploadDate: '2024-01-15',
      status: 'verified',
      size: '512 KB'
    },
    {
      id: 3,
      name: 'Educational Certificate',
      type: 'Education',
      fileName: 'degree_certificate.pdf',
      uploadDate: '2024-01-10',
      status: 'pending',
      size: '1.2 MB'
    }
  ])
  
  const [dragActive, setDragActive] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])

  const documentTypes = [
    'Identity Documents',
    'Educational Certificates',
    'Experience Letters',
    'Bank Documents',
    'Medical Records',
    'Other'
  ]

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
      const maxSize = 5 * 1024 * 1024 // 5MB

      if (!validTypes.includes(file.type)) {
        toast.error(`${file.name}: Only PDF, JPG, and PNG files are allowed`)
        return false
      }

      if (file.size > maxSize) {
        toast.error(`${file.name}: File size must be less than 5MB`)
        return false
      }

      return true
    })

    if (validFiles.length > 0) {
      setSelectedFiles(prev => [...prev, ...validFiles])
      toast.success(`${validFiles.length} file(s) selected for upload`)
    }
  }

  const uploadFiles = () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select files to upload')
      return
    }

    // Simulate upload process
    selectedFiles.forEach((file, index) => {
      setTimeout(() => {
        const newDocument = {
          id: documents.length + index + 1,
          name: file.name.split('.')[0],
          type: 'Uploaded',
          fileName: file.name,
          uploadDate: new Date().toISOString().split('T')[0],
          status: 'pending',
          size: formatFileSize(file.size)
        }

        setDocuments(prev => [...prev, newDocument])
        
        if (index === selectedFiles.length - 1) {
          setSelectedFiles([])
          toast.success('All files uploaded successfully!')
        }
      }, (index + 1) * 500)
    })
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const downloadDocument = (doc) => {
    toast.success(`Downloading ${doc.fileName}`)
    // Simulate download
  }

  const viewDocument = (doc) => {
    toast.info(`Opening ${doc.fileName} in viewer`)
    // Simulate view
  }

  const deleteDocument = (id) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id))
    toast.success('Document deleted successfully')
  }

  const removeSelectedFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100">
            Document Management
          </h2>
          <p className="text-surface-600 dark:text-surface-400">
            Upload and manage your important personal documents
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-6">
        <h3 className="text-lg font-medium text-surface-900 dark:text-surface-100 mb-4">
          Upload New Documents
        </h3>

        {/* Drag and Drop Area */}
        <div
          className={`document-upload-area ${dragActive ? 'border-primary bg-primary/10' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-surface-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-surface-900 dark:text-surface-100 mb-2">
            Drag & drop files here
          </h4>
          <p className="text-surface-600 dark:text-surface-400 mb-4">
            or click to browse files
          </p>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary-dark transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Choose Files
          </label>
          <p className="text-xs text-surface-500 dark:text-surface-400 mt-2">
            Supported formats: PDF, JPG, PNG (Max 5MB each)
          </p>
        </div>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="mt-6">
            <h4 className="font-medium text-surface-900 dark:text-surface-100 mb-3">
              Selected Files ({selectedFiles.length})
            </h4>
            <div className="space-y-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="file-item">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-primary mr-3" />
                    <div>
                      <p className="font-medium text-surface-900 dark:text-surface-100">
                        {file.name}
                      </p>
                      <p className="text-sm text-surface-500 dark:text-surface-400">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeSelectedFile(index)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={uploadFiles}
              className="mt-4 px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors"
            >
              Upload {selectedFiles.length} File(s)
            </button>
          </div>
        )}
      </div>

      {/* Documents List */}
      <div>
        <h3 className="text-lg font-medium text-surface-900 dark:text-surface-100 mb-4">
          My Documents ({documents.length})
        </h3>

        <div className="grid gap-4">
          {documents.map((doc) => (
            <div key={doc.id} className="file-item">
              <div className="flex items-center flex-1">
                <FileText className="w-6 h-6 text-primary mr-4" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-surface-900 dark:text-surface-100">
                      {doc.name}
                    </h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      doc.status === 'verified' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {doc.status === 'verified' ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <AlertCircle className="w-3 h-3 mr-1" />
                      )}
                      {doc.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-surface-500 dark:text-surface-400">
                    <span>Type: {doc.type}</span>
                    <span>Size: {doc.size}</span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(doc.uploadDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => viewDocument(doc)}
                  className="p-2 text-surface-600 dark:text-surface-300 hover:text-primary hover:bg-primary/10 rounded-lg transition-all"
                  title="View Document"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => downloadDocument(doc)}
                  className="p-2 text-surface-600 dark:text-surface-300 hover:text-secondary hover:bg-secondary/10 rounded-lg transition-all"
                  title="Download Document"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="p-2 text-surface-600 dark:text-surface-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                  title="Delete Document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {documents.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-surface-900 dark:text-surface-100 mb-2">
              No Documents Yet
            </h3>
            <p className="text-surface-600 dark:text-surface-400">
              Upload your first document using the form above
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentSection