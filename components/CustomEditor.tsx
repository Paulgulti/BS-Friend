'use client'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import 'quill/dist/quill.snow.css';

interface CustomEditorProps {
  value?: string;
  onChange?: (content: string) => void;
  onChangeText?: (text: string) => void;
  readOnly?: boolean;
  placeholder?: string;
}

export type CustomEditorHandle = {
  getHtml: () => string;
  getText: () => string;
  focus: () => void;
};

const CustomEditor = forwardRef<CustomEditorHandle, CustomEditorProps>(({ value = '', onChange, onChangeText, readOnly = false, placeholder = 'Write something...' }, ref) => {
  const editorRootRef = useRef<HTMLDivElement>(null);
  const quillInstanceRef = useRef<any | null>(null);
  const onChangeRef = useRef<CustomEditorProps['onChange']>(onChange);
  onChangeRef.current = onChange;
  const onChangeTextRef = useRef<CustomEditorProps['onChangeText']>(onChangeText);
  onChangeTextRef.current = onChangeText;
  const [editorId] = useState(`quill-editor-${Math.random().toString(36).substring(2, 9)}`);
  // Expose imperative API for parent components (e.g., to fetch content on Save click)
  useImperativeHandle(ref, () => ({
    getHtml: () => {
      const quill = quillInstanceRef.current;
      return quill ? quill.root.innerHTML : '';
    },
    getText: () => {
      const quill = quillInstanceRef.current;
      return quill ? quill.getText() : '';
    },
    focus: () => {
      const quill = quillInstanceRef.current;
      if (quill) quill.focus();
    }
  }), []);

  // Initialize Quill once on mount
  useEffect(() => {
    let isMounted = true;
    async function init() {
      if (!editorRootRef.current) return;
      // Clear container and create a fresh mount node for Quill
      editorRootRef.current.innerHTML = '';
      const mountDiv = document.createElement('div');
      mountDiv.id = editorId;
      editorRootRef.current.appendChild(mountDiv);

      const Quill = (await import('quill')).default;
      const modules = {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'blockquote', 'code-block'],
          [{ align: [] }]
        ]
      };

      const quill = new Quill(mountDiv, {
        theme: 'snow',
        modules,
        placeholder,
        readOnly
      });
      if (!isMounted) return;
      quillInstanceRef.current = quill;

      // Set initial content
      if (value) {
        quill.clipboard.dangerouslyPasteHTML(value);
      }

      quill.on('text-change', () => {
        const html = quill.root.innerHTML;
        const text = quill.getText();
        onChangeRef.current?.(html);
        onChangeTextRef.current?.(text);
      });
    }
    init();

    return () => {
      isMounted = false;
      const container = editorRootRef.current;
      if (container) {
        // Remove only toolbars inside this container
        container.querySelectorAll('.ql-toolbar').forEach(tb => tb.remove());
        container.innerHTML = '';
      }
      quillInstanceRef.current = null;
    };
  // Intentionally only depend on editorId so we don't recreate on each render/prop change
  }, [editorId]);

  // Keep readOnly in sync
  useEffect(() => {
    if (quillInstanceRef.current) {
      quillInstanceRef.current.enable(!readOnly);
    }
  }, [readOnly]);

  // Keep placeholder in sync
  useEffect(() => {
    const editorEl = editorRootRef.current?.querySelector('.ql-editor') as HTMLElement | null;
    if (editorEl) {
      editorEl.setAttribute('data-placeholder', placeholder || '');
    }
  }, [placeholder]);

  // Keep external value in sync (when parent changes it)
  useEffect(() => {
    const quill = quillInstanceRef.current;
    if (!quill) return;
    const currentHtml = quill.root.innerHTML;
    if (typeof value === 'string' && value !== currentHtml) {
      const selection = quill.getSelection();
      quill.clipboard.dangerouslyPasteHTML(value || '');
      if (selection) quill.setSelection(selection);
    }
  }, [value]);

  return <div ref={editorRootRef} className="custom-editor-container"></div>;
});

export default CustomEditor;