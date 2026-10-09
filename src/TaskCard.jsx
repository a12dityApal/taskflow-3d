import React from 'react';
import { Calendar, Edit2, Trash2, Check, Clock, FileText, Smartphone, Layout, Globe } from 'lucide-react';

const TaskCard = ({ task, onToggle, onDelete, onEdit }) => {
  // Category Icons Map
  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'mobile':
      case 'dev':
        return <Smartphone className="w-5 h-5 text-emerald-400" />;
      case 'blog':
      case 'content':
        return <FileText className="w-5 h-5 text-amber-400" />;
      case 'auth':
      case 'flow':
        return <Globe className="w-5 h-5 text-purple-400" />;
      default:
        return <Layout className="w-5 h-5 text-blue-400" />;
    }
  };

  const getStatusBadge = () => {
    if (task.completed) {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
          <Check className="w-3.5 h-3.5" /> Done
        </span>
      );
    }
    if (task.status === 'In Progress') {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/80 text-purple-300 border border-purple-500/30">
          <Clock className="w-3.5 h-3.5" /> In Progress
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/80 text-blue-400 border border-blue-500/30">
        <Clock className="w-3.5 h-3.5" /> To Do
      </span>
    );
  };

  const getPriorityBadge = () => {
    if (task.priority === 'High') {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-950/80 text-rose-400 border border-rose-500/30">
          <span className="w-2 h-2 rounded-full bg-rose-500"></span> High
        </span>
      );
    }
    if (task.priority === 'Medium') {
      return (
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-400 border border-amber-500/30">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span> Medium
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Low
      </span>
    );
  };

  return (
    <div className="bg-[#111726] border border-slate-800 hover:border-slate-700 transition-all duration-300 rounded-2xl p-5 shadow-lg relative group">
      {/* Top Header: Icon & Content */}
      <div className="flex items-start gap-4 mb-3">
        <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800/80 shrink-0">
          {getCategoryIcon(task.category)}
        </div>
        <div className="flex-1">
          <h3 className={`text-base font-bold text-slate-100 ${task.completed ? 'line-through text-slate-400' : ''}`}>
            {task.title}
          </h3>
          <p className="text-slate-400 text-xs mt-1 leading-relaxed line-clamp-2">
            {task.description}
          </p>
        </div>
      </div>

      {/* Due Date */}
      <div className="flex items-center gap-2 text-slate-400 text-xs my-4 font-medium pl-1">
        <Calendar className="w-4 h-4 text-blue-400" />
        <span>Due: <strong className="text-blue-300">{task.dueDate || '2026-10-30'}</strong></span>
      </div>

      <div className="h-[1px] bg-slate-800/60 my-3"></div>

      {/* Bottom Action Controls & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-2">
          {getPriorityBadge()}
          <button onClick={() => onToggle(task.id)} className="cursor-pointer">
            {getStatusBadge()}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit && onEdit(task)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700/50 transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" /> Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 text-xs font-medium border border-rose-900/40 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;