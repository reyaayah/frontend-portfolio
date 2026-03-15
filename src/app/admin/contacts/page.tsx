// app/admin/contacts/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { getContacts, markContactAsRead, deleteContact } from '@/lib/api';
import PageHeader from '@/components/admin/PageHeader';
import { Trash2, Loader, AlertCircle, Mail, Calendar } from 'lucide-react';

interface Contact {
    id: number;
    name: string;
    email: string;
    subject?: string;
    message: string;
    isRead: boolean;
    createdAt: string;
}

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                setLoading(true);
                const data = await getContacts();
                setContacts(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    const handleMarkRead = async (id: number, isRead: boolean) => {
        try {
            await markContactAsRead(id, !isRead);
            setContacts(
                contacts.map(c =>
                    c.id === id ? { ...c, isRead: !isRead } : c
                )
            );
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;

        try {
            await deleteContact(id);
            setContacts(contacts.filter(c => c.id !== id));
        } catch (err: any) {
            setError(err.message);
        }
    };

    const unreadCount = contacts.filter(c => !c.isRead).length;

    return (
        <div className="space-y-6">
            <PageHeader
                title="Messages"
                description={`You have ${unreadCount} unread message${unreadCount !== 1 ? 's' : ''}`}
            />

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader className="w-8 h-8 animate-spin text-purple-600" />
                </div>
            ) : contacts.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-lg">
                    <p className="text-slate-600">No messages yet.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {contacts.map((contact) => (
                        <div
                            key={contact.id}
                            className={`p-6 rounded-lg border transition-all cursor-pointer ${contact.isRead
                                    ? 'bg-white border-slate-200'
                                    : 'bg-blue-50 border-blue-200'
                                }`}
                            onClick={() => setSelectedId(selectedId === contact.id ? null : contact.id)}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-slate-900">{contact.name}</h3>
                                        {!contact.isRead && (
                                            <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">
                                                New
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-600 mt-1 flex items-center gap-1">
                                        <Mail size={14} />
                                        {contact.email}
                                    </p>
                                </div>

                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                    <Calendar size={14} />
                                    {new Date(contact.createdAt).toLocaleDateString()}
                                </div>
                            </div>

                            {/* Subject */}
                            {contact.subject && (
                                <p className="text-sm font-semibold text-slate-800 mb-2">{contact.subject}</p>
                            )}

                            {/* Expanded Message */}
                            {selectedId === contact.id && (
                                <div className="mb-4 p-4 bg-white rounded border border-slate-200">
                                    <p className="text-slate-700 whitespace-pre-wrap">{contact.message}</p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2 flex-wrap">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleMarkRead(contact.id, contact.isRead);
                                    }}
                                    className={`px-3 py-1 text-xs rounded font-medium transition-colors ${contact.isRead
                                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                        }`}
                                >
                                    {contact.isRead ? 'Mark Unread' : 'Mark Read'}
                                </button>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(contact.id);
                                    }}
                                    className="flex items-center gap-1 px-3 py-1 text-xs bg-red-50 text-red-600 hover:bg-red-100 rounded font-medium"
                                >
                                    <Trash2 size={14} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
