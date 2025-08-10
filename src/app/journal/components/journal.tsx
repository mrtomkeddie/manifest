
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Trash2, Edit, Save, XCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


interface JournalEntry {
  id: string;
  date: string;
  content: string;
}

export function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      try {
        const storedEntries = localStorage.getItem('journalEntries');
        if (storedEntries) {
          setEntries(JSON.parse(storedEntries));
        }
      } catch (error) {
        console.error("Failed to parse journal entries from localStorage", error);
        toast({
          title: 'Error',
          description: 'Could not load your journal entries.',
          variant: 'destructive',
        });
      }
    }
  }, [isMounted, toast]);

  useEffect(() => {
    if (isMounted) {
        localStorage.setItem('journalEntries', JSON.stringify(entries));
    }
  }, [entries, isMounted]);

  const handleAddEntry = () => {
    if (newEntry.trim() === '') {
      toast({
        title: 'Empty Entry',
        description: 'You cannot save an empty journal entry.',
        variant: 'destructive',
      });
      return;
    }
    const newEntryObject: JournalEntry = {
      id: new Date().toISOString(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      content: newEntry,
    };
    setEntries([newEntryObject, ...entries]);
    setNewEntry('');
    toast({
      title: 'Entry Saved',
      description: 'Your new journal entry has been saved.',
    });
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
    toast({
      title: 'Entry Deleted',
      description: 'Your journal entry has been removed.',
    });
  };

  const handleStartEditing = (entry: JournalEntry) => {
    setEditingEntryId(entry.id);
    setEditingContent(entry.content);
  };

  const handleCancelEditing = () => {
    setEditingEntryId(null);
    setEditingContent('');
  };

  const handleUpdateEntry = () => {
    if (editingEntryId === null) return;
    setEntries(
      entries.map((entry) =>
        entry.id === editingEntryId ? { ...entry, content: editingContent } : entry
      )
    );
    handleCancelEditing();
    toast({
        title: 'Entry Updated',
        description: 'Your journal entry has been successfully updated.',
    });
  };
  
  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="space-y-8">
      <Card className="bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
        <CardHeader>
          <CardTitle>New Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="What's on your mind?..."
            rows={6}
            className="text-base"
          />
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddEntry}>
            <PlusCircle className="mr-2" />
            Save Entry
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-6">
        <h2 className="text-3xl font-headline text-center text-primary">Past Entries</h2>
        {entries.length > 0 ? (
          entries.map((entry) => (
            <Card key={entry.id} className="bg-card/50 border-primary/10">
              <CardHeader>
                <CardTitle className="text-xl flex justify-between items-center">
                  <span className="font-normal text-foreground/80">{entry.date}</span>
                  <div className="flex items-center gap-2">
                    {editingEntryId === entry.id ? (
                        <>
                            <Button variant="ghost" size="icon" onClick={handleUpdateEntry}>
                                <Save className="h-5 w-5 text-primary" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={handleCancelEditing}>
                                <XCircle className="h-5 w-5 text-muted-foreground" />
                            </Button>
                        </>
                    ) : (
                        <Button variant="ghost" size="icon" onClick={() => handleStartEditing(entry)}>
                            <Edit className="h-5 w-5 text-muted-foreground" />
                        </Button>
                    )}
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Trash2 className="h-5 w-5 text-destructive/80" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your journal entry.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteEntry(entry.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {editingEntryId === entry.id ? (
                    <Textarea 
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        rows={5}
                        className="text-base"
                    />
                ) : (
                    <p className="text-base whitespace-pre-wrap text-foreground/90">{entry.content}</p>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 text-foreground/60">
            <p>Your past journal entries will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
