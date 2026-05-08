import { useState } from 'react';
import { UploadCloud, Folder, FileJson, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';

const UploadArea = ({ onDataProcessed }) => {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('folder'); // 'folder' or 'files'
  const [files, setFiles] = useState({ followers: null, following: null });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFiles = async (selectedFiles) => {
    setError(null);
    let followersFile, followingFile;

    // Search for the required files regardless of mode
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      if (file.name === 'followers_1.json') followersFile = file;
      if (file.name === 'following.json') followingFile = file;
    }

    if (!followersFile && !followingFile) {
      setError(t('uploadArea.errorTitle'));
      return;
    }

    if (!followersFile) {
      setError(t('uploadArea.errorFollowersMissing'));
      return;
    }

    if (!followingFile) {
      setError(t('uploadArea.errorFollowingMissing'));
      return;
    }

    try {
      setFiles({ followers: followersFile.name, following: followingFile.name });
      
      const followersText = await followersFile.text();
      const followingText = await followingFile.text();
      
      const followersData = JSON.parse(followersText);
      const followingData = JSON.parse(followingText);
      
      onDataProcessed(followersData, followingData);
    } catch (err) {
      console.error(err);
      setError(t('uploadArea.errorParseJson'));
      setFiles({ followers: null, following: null });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 p-4 animate-slide-up">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text-primary tracking-tight">{t('uploadArea.heading')}</h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          {t('uploadArea.subtitle')}
          <span className="block mt-1 font-medium">{t('uploadArea.subtitleBold')}</span>
        </p>
      </div>

      <div className="flex justify-center mb-6 bg-surface p-1 rounded-lg w-fit mx-auto border border-border-light shadow-sm">
        <button
          onClick={() => setMode('folder')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 flex items-center gap-2 ${
            mode === 'folder' ? 'bg-accent/15 text-accent border border-accent/25 shadow-sm' : 'text-text-secondary hover:text-text-primary border border-transparent'
          }`}
        >
          <Folder className="w-4 h-4" /> {t('uploadArea.folderMode')}
        </button>
        <button
          onClick={() => setMode('files')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 flex items-center gap-2 ${
            mode === 'files' ? 'bg-accent/15 text-accent border border-accent/25 shadow-sm' : 'text-text-secondary hover:text-text-primary border border-transparent'
          }`}
        >
          <FileJson className="w-4 h-4" /> {t('uploadArea.filesMode')}
        </button>
      </div>

      <form 
        onDragEnter={handleDrag} 
        onDragLeave={handleDrag} 
        onDragOver={handleDrag} 
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-all duration-300 ${
          dragActive ? 'border-accent bg-accent/5 animate-pulse-border' : 'border-border-light bg-surface hover:border-accent/50'
        }`}
      >
        <input 
          type="file" 
          id="file-upload" 
          multiple={mode === 'files'}
          webkitdirectory={mode === 'folder' ? "true" : undefined}
          directory={mode === 'folder' ? "true" : undefined}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleChange}
        />
        
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center pointer-events-none">
          <div className="w-16 h-16 mb-4 rounded-full bg-accent/10 flex items-center justify-center">
            <UploadCloud className={`w-8 h-8 ${dragActive ? 'text-accent' : 'text-text-secondary'}`} />
          </div>
          <p className="mb-2 text-sm text-text-secondary">
            <span className="font-semibold text-accent">{t('uploadArea.uploadText')}</span> {t('uploadArea.uploadSubtext')}
          </p>
          <p className="text-xs text-text-secondary/70 max-w-xs mx-auto">
            {mode === 'folder' 
              ? t('uploadArea.folderHint')
              : t('uploadArea.filesHint')}
          </p>
        </div>
      </form>

      {error && (
        <div className="mt-6 p-4 rounded-xl bg-danger/10 border border-danger flex items-start gap-3 animate-slide-in">
          <AlertCircle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
          <p className="text-sm text-danger font-medium">{error}</p>
        </div>
      )}

      {/* Video Tutorial Embed */}
      <div className="mt-16 bg-surface rounded-2xl shadow-sm border border-border-light p-6 md:p-10 text-left">
        <div className="mb-6">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/4eh8eJAUEdk"
              title="Video Tutorial - Cara Mendapatkan Data dari Instagram"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-xl"
            ></iframe>
          </div>
          <p className="text-xs text-text-secondary/60 text-center mt-2">
            Tutorial: Cara mendapatkan data Instagram (JSON) untuk aplikasi ini
          </p>
        </div>

        <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
          {t('uploadArea.instructions')}
        </h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-border-light text-text-primary flex items-center justify-center font-bold shrink-0 mt-0.5">1</div>
              <div>
                <h4 className="font-semibold text-text-primary mb-1">{t('uploadArea.step1Title')}</h4>
                <p className="text-sm text-text-secondary">{t('uploadArea.step1Desc')}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-border-light text-text-primary flex items-center justify-center font-bold shrink-0 mt-0.5">2</div>
              <div>
                <h4 className="font-semibold text-text-primary mb-1">{t('uploadArea.step2Title')}</h4>
                <p className="text-sm text-text-secondary">{t('uploadArea.step2Desc')}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-border-light text-text-primary flex items-center justify-center font-bold shrink-0 mt-0.5">3</div>
              <div>
                <h4 className="font-semibold text-text-primary mb-1">{t('uploadArea.step3Title')}</h4>
                <p className="text-sm text-text-secondary">{t('uploadArea.step3Desc')}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl border border-accent/30 bg-accent/5">
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold shrink-0 mt-0.5">4</div>
              <div>
                <h4 className="font-semibold text-accent mb-1">{t('uploadArea.step4Title')}</h4>
                <p className="text-sm text-text-secondary">{t('uploadArea.step4Desc')}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-border-light text-text-primary flex items-center justify-center font-bold shrink-0 mt-0.5">5</div>
              <div>
                <h4 className="font-semibold text-text-primary mb-1">{t('uploadArea.step5Title')}</h4>
                <p className="text-sm text-text-secondary">{t('uploadArea.step5Desc')}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-border-light text-text-primary flex items-center justify-center font-bold shrink-0 mt-0.5">6</div>
              <div>
                <h4 className="font-semibold text-text-primary mb-1">{t('uploadArea.step6Title')}</h4>
                <p className="text-sm text-text-secondary">{t('uploadArea.step6Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadArea;
