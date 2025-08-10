
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
import { Calendar } from '@/components/ui/calendar';


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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
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
      date: new Date().toISOString(),
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

  const filteredEntries = entries.filter(entry => {
    if (!selectedDate) return true;
    const entryDate = new Date(entry.date);
    return entryDate.toDateString() === selectedDate.toDateString();
  }).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1 flex flex-col gap-8">
        <Card className="bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
            <CardHeader>
                <CardTitle>Browse Entries</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                />
            </CardContent>
        </Card>
        <Card className="bg-card/50 border-primary/20 shadow-xl shadow-primary/5">
            <CardHeader>
            <CardTitle>Today's Entry</CardTitle>
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
      </div>

      <div className="md:col-span-2 space-y-6">
        <h2 className="text-3xl font-headline text-center text-primary">
            Entries for {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'All Dates'}
        </h2>
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry) => (
            <Card key={entry.id} className="bg-card/50 border-primary/10">
              <CardHeader>
                <CardTitle className="text-xl flex justify-between items-center">
                  <span className="font-normal text-foreground/80">
                    {new Date(entry.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
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
            <p>No journal entries for this date.</p>
          </div>
        )}
      </div>
    </div>
  );
}
