import React, { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/axios";
import {
  FiBold, FiItalic, FiUnderline, FiList, FiLink,
  FiAlignLeft, FiAlignCenter, FiAlignRight, FiArrowLeft, FiSend
} from "react-icons/fi";
import { MdFormatListNumbered, MdFormatQuote } from "react-icons/md";

// ─── Rich Text Editor ─────────────────────────────────────────────────────────
const ToolbarButton = ({
  onClick, title, children, active = false,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
  active?: boolean;
}) => (
  <button
    type="button"
    onMouseDown={(e) => { e.preventDefault(); onClick(); }}
    title={title}
    className={`p-1.5 rounded text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors ${active ? "bg-gray-200 text-gray-900" : ""}`}
  >
    {children}
  </button>
);

const RichTextEditor = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({});

  const exec = useCallback((command: string, val?: string) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
    if (editorRef.current) onChange(editorRef.current.innerHTML);
    checkFormats();
  }, [onChange]);

  const checkFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      justifyLeft: document.queryCommandState("justifyLeft"),
      justifyCenter: document.queryCommandState("justifyCenter"),
      justifyRight: document.queryCommandState("justifyRight"),
    });
  };

  const insertLink = () => {
    const url = prompt("Enter URL:", "https://");
    if (url) exec("createLink", url);
  };

  const insertHeading = (tag: string) => {
    exec("formatBlock", tag);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:border-[#275949] focus-within:ring-1 focus-within:ring-[#275949]">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 bg-gray-50 border-b border-gray-200">
        {/* Headings dropdown */}
        <select
          onMouseDown={(e) => e.preventDefault()}
          onChange={(e) => { insertHeading(e.target.value); e.target.value = ""; }}
          className="text-xs border border-gray-300 rounded px-1 py-1 text-gray-600 bg-white mr-1"
          defaultValue=""
        >
          <option value="" disabled>Style</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="p">Paragraph</option>
        </select>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton onClick={() => exec("bold")} title="Bold (Ctrl+B)" active={activeFormats.bold}>
          <FiBold size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("italic")} title="Italic (Ctrl+I)" active={activeFormats.italic}>
          <FiItalic size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("underline")} title="Underline (Ctrl+U)" active={activeFormats.underline}>
          <FiUnderline size={14} />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton onClick={() => exec("justifyLeft")} title="Align Left" active={activeFormats.justifyLeft}>
          <FiAlignLeft size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("justifyCenter")} title="Align Center" active={activeFormats.justifyCenter}>
          <FiAlignCenter size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("justifyRight")} title="Align Right" active={activeFormats.justifyRight}>
          <FiAlignRight size={14} />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton onClick={() => exec("insertUnorderedList")} title="Bullet List">
          <FiList size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("insertOrderedList")} title="Numbered List">
          <MdFormatListNumbered size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("formatBlock", "blockquote")} title="Block Quote">
          <MdFormatQuote size={14} />
        </ToolbarButton>

        <div className="w-px h-5 bg-gray-300 mx-1" />

        <ToolbarButton onClick={insertLink} title="Insert Link">
          <FiLink size={14} />
        </ToolbarButton>
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={() => { if (editorRef.current) onChange(editorRef.current.innerHTML); }}
        onKeyUp={checkFormats}
        onMouseUp={checkFormats}
        onFocus={checkFormats}
        className="min-h-[220px] p-4 text-sm text-gray-800 outline-none leading-relaxed"
        style={{ fontFamily: "Arial, sans-serif" }}
        dangerouslySetInnerHTML={value && !editorRef.current ? { __html: value } : undefined}
        data-placeholder="Write your email content here... Use the toolbar above to format text."
      />

      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        [contenteditable] blockquote {
          border-left: 4px solid #275949;
          margin: 8px 0;
          padding: 4px 12px;
          color: #4b5563;
          font-style: italic;
        }
        [contenteditable] a { color: #275949; text-decoration: underline; }
        [contenteditable] h1 { font-size: 1.5rem; font-weight: 700; margin: 8px 0; }
        [contenteditable] h2 { font-size: 1.25rem; font-weight: 700; margin: 8px 0; }
        [contenteditable] h3 { font-size: 1.1rem; font-weight: 600; margin: 8px 0; }
        [contenteditable] ul { list-style: disc; padding-left: 24px; margin: 6px 0; }
        [contenteditable] ol { list-style: decimal; padding-left: 24px; margin: 6px 0; }
      `}</style>
    </div>
  );
};

// ─── Campaign Form ─────────────────────────────────────────────────────────────
const AdminNewsletterCampaign = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    content: "",
    category: "General",
    image: "",
    readMoreLink: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content || formData.content === "<br>") {
      setError("Please write some email content.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/newsletter/campaigns/send", formData);
      setSuccess("Campaign sent successfully! Redirecting...");
      setTimeout(() => navigate("/admin/newsletter"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl px-3 sm:px-4 lg:px-0 pb-12">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Send Campaign</h1>
          <p className="text-sm text-gray-500 mt-1">Compose and send a newsletter to all active subscribers</p>
        </div>
        <button
          onClick={() => navigate("/admin/newsletter")}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 text-sm transition-colors"
        >
          <FiArrowLeft size={14} />
          Back
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {success}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title & Subject */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Title *</label>
              <input
                type="text" name="title" value={formData.title}
                onChange={handleChange} required
                placeholder="e.g. November Heritage News"
                className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#275949] focus:ring-1 focus:ring-[#275949]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Subject Line *</label>
              <input
                type="text" name="subject" value={formData.subject}
                onChange={handleChange} required
                placeholder="e.g. Discover the hidden ruins of Anuradhapura"
                className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#275949] focus:ring-1 focus:ring-[#275949]"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category" value={formData.category} onChange={handleChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#275949] focus:ring-1 focus:ring-[#275949]"
            >
              <option value="General">General News</option>
              <option value="Promotional">Promotional</option>
              <option value="Event">Event</option>
            </select>
          </div>

          {/* Image & Link */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
              <input
                type="text" name="image" value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#275949] focus:ring-1 focus:ring-[#275949]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Read More Link</label>
              <input
                type="text" name="readMoreLink" value={formData.readMoreLink}
                onChange={handleChange}
                placeholder="https://heritagesrilanka.com/article"
                className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#275949] focus:ring-1 focus:ring-[#275949]"
              />
            </div>
          </div>

          {/* Rich Text Content Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Content *
              <span className="ml-2 font-normal text-gray-400 text-xs">(Use the toolbar to format — no HTML needed)</span>
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(html) => setFormData((prev) => ({ ...prev, content: html }))}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button
              type="submit" disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#275949] text-white font-medium rounded-lg hover:bg-[#1a3f33] disabled:opacity-50 transition-colors"
            >
              <FiSend size={14} />
              {loading ? "Sending..." : "Send Campaign Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminNewsletterCampaign;

