'use client';

import { useEffect, useMemo, useState } from 'react';

type Word = {
  id: number;
  georgian: string;
  reading: string;
  meaning: string;
  category: string;
};

type Sentence = {
  id: number;
  georgian: string;
  reading: string;
  meaning: string;
};

type Note = {
  id: number;
  title: string;
  georgian: string;
  reading: string;
  meaning: string;
  note: string;
  createdAt: string;
};

const alphabet = [
  { letter: 'ა', reading: 'a', note: 'Türkçedeki a sesi gibi okunur.' },
  { letter: 'ბ', reading: 'b', note: 'Türkçedeki b sesi gibi okunur.' },
  { letter: 'გ', reading: 'g', note: 'Türkçedeki g sesi gibi okunur.' },
  { letter: 'დ', reading: 'd', note: 'Türkçedeki d sesi gibi okunur.' },
  { letter: 'ე', reading: 'e', note: 'Türkçedeki e sesi gibi okunur.' },
  { letter: 'ვ', reading: 'v', note: 'Türkçedeki v sesi gibi okunur.' },
  { letter: 'ზ', reading: 'z', note: 'Türkçedeki z sesi gibi okunur.' },
  { letter: 'თ', reading: 't', note: 'Nefesli t sesiyle okunur.' },
  { letter: 'ი', reading: 'i', note: 'Türkçedeki i sesi gibi okunur.' },
  { letter: 'კ', reading: 'k', note: 'Sert k sesiyle okunur.' },
  { letter: 'ლ', reading: 'l', note: 'Türkçedeki l sesi gibi okunur.' },
  { letter: 'მ', reading: 'm', note: 'Türkçedeki m sesi gibi okunur.' },
  { letter: 'ნ', reading: 'n', note: 'Türkçedeki n sesi gibi okunur.' },
  { letter: 'ო', reading: 'o', note: 'Türkçedeki o sesi gibi okunur.' },
  { letter: 'პ', reading: 'p', note: 'Sert p sesiyle okunur.' },
  { letter: 'ჟ', reading: 'j', note: 'J sesine yakın okunur.' },
  { letter: 'რ', reading: 'r', note: 'Türkçedeki r sesi gibi okunur.' },
  { letter: 'ს', reading: 's', note: 'Türkçedeki s sesi gibi okunur.' },
  { letter: 'ტ', reading: 't', note: 'Sert t sesiyle okunur.' },
  { letter: 'უ', reading: 'u', note: 'Türkçedeki u sesi gibi okunur.' },
  { letter: 'ფ', reading: 'p / f arası', note: 'Nefesli p sesine yakındır.' },
  { letter: 'ქ', reading: 'k', note: 'Nefesli k sesiyle okunur.' },
  { letter: 'ღ', reading: 'ğ / gh', note: 'Boğazdan gelen yumuşak ğ sesine yakındır.' },
  { letter: 'ყ', reading: 'q / sert k', note: 'Gırtlaktan gelen sert k/q arası sesle okunur.' },
  { letter: 'შ', reading: 'ş', note: 'Türkçedeki ş sesi gibi okunur.' },
  { letter: 'ჩ', reading: 'ç', note: 'Nefesli ç sesiyle okunur.' },
  { letter: 'ც', reading: 'ts', note: 'ts birleşik sesiyle okunur.' },
  { letter: 'ძ', reading: 'dz', note: 'dz birleşik sesiyle okunur.' },
  { letter: 'წ', reading: 'ts / sert ts', note: 'Daha sert ts sesiyle okunur.' },
  { letter: 'ჭ', reading: 'ç / sert ç', note: 'Daha sert ç sesiyle okunur.' },
  { letter: 'ხ', reading: 'h / kh', note: 'Boğazdan gelen h/kh sesine yakındır.' },
  { letter: 'ჯ', reading: 'c', note: 'Türkçedeki c sesi gibi okunur.' },
  { letter: 'ჰ', reading: 'h', note: 'Türkçedeki h sesi gibi okunur.' },
];


const georgianKeyboardRows = [
  ['ა', 'ბ', 'გ', 'დ', 'ე', 'ვ', 'ზ'],
  ['თ', 'ი', 'კ', 'ლ', 'მ', 'ნ', 'ო'],
  ['პ', 'ჟ', 'რ', 'ს', 'ტ', 'უ', 'ფ'],
  ['ქ', 'ღ', 'ყ', 'შ', 'ჩ', 'ც', 'ძ'],
  ['წ', 'ჭ', 'ხ', 'ჯ', 'ჰ'],
];

const starterWords: Word[] = [
  { id: 1, georgian: 'სახლი', reading: 'sakhli', meaning: 'ev', category: 'Ders 1' },
  { id: 2, georgian: 'კაცი', reading: 'katsi', meaning: 'adam / erkek', category: 'Ders 1' },
  { id: 3, georgian: 'ქალი', reading: 'kali', meaning: 'kadın', category: 'Ders 1' },
  { id: 4, georgian: 'თხა', reading: 'tkha', meaning: 'keçi', category: 'Ders 1' },
  { id: 5, georgian: 'კარი', reading: 'kari', meaning: 'kapı', category: 'Ders 1' },
  { id: 6, georgian: 'მელა', reading: 'mela', meaning: 'tilki', category: 'Ders 1' },
  { id: 7, georgian: 'მზე', reading: 'mze', meaning: 'güneş', category: 'Ders 1' },
  { id: 8, georgian: 'კალამი', reading: 'kalami', meaning: 'kalem', category: 'Ders 1' },
  { id: 9, georgian: 'რვეული', reading: 'rveuli', meaning: 'defter', category: 'Ders 1' },
  { id: 10, georgian: 'სკამი', reading: 'skami', meaning: 'sandalye', category: 'Ders 1' },
];

const starterSentences: Sentence[] = [
  { id: 1, georgian: 'ეს არის სახლი.', reading: 'es aris sakhli', meaning: 'Bu evdir.' },
  { id: 2, georgian: 'ეს არის კაცი.', reading: 'es aris katsi', meaning: 'Bu adamdır.' },
  { id: 3, georgian: 'ეს არის ქალი.', reading: 'es aris kali', meaning: 'Bu kadındır.' },
  { id: 4, georgian: 'ეს არის კარი.', reading: 'es aris kari', meaning: 'Bu kapıdır.' },
  { id: 5, georgian: 'ეს არის კალამი.', reading: 'es aris kalami', meaning: 'Bu kalemdir.' },
];

const tabs = [
  { id: 'home', label: 'Ana' },
  { id: 'alphabet', label: 'Alfabe' },
  { id: 'words', label: 'Kelime' },
  { id: 'sentences', label: 'Cümle' },
  { id: 'notes', label: 'Not' },
  { id: 'quiz', label: 'Test' },
] as const;

type TabId = (typeof tabs)[number]['id'];

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [words, setWords] = useState<Word[]>(starterWords);
  const [notes, setNotes] = useState<Note[]>([]);
  const [reviewIds, setReviewIds] = useState<number[]>([]);
  const [shownWordId, setShownWordId] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const [wordForm, setWordForm] = useState({
    georgian: '',
    reading: '',
    meaning: '',
    category: '',
  });

  const [noteForm, setNoteForm] = useState({
    title: '',
    georgian: '',
    reading: '',
    meaning: '',
    note: '',
  });

  useEffect(() => {
    const savedNotes = readStorage<Note[]>('kartuli_notes', []);
    const savedReviewIds = readStorage<number[]>('kartuli_review_ids', []);
    const savedWords = readStorage<Word[]>('kartuli_words', starterWords);

    setNotes(Array.isArray(savedNotes) ? savedNotes : []);
    setReviewIds(Array.isArray(savedReviewIds) ? savedReviewIds : []);

    if (Array.isArray(savedWords) && savedWords.length > 0) {
      setWords(savedWords);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('kartuli_notes', JSON.stringify(notes));
  }, [notes, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('kartuli_review_ids', JSON.stringify(reviewIds));
  }, [reviewIds, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('kartuli_words', JSON.stringify(words));
  }, [words, isLoaded]);

  const dailyWords = useMemo(() => words.slice(0, 5), [words]);
  const reviewWords = useMemo(
    () => words.filter((word) => reviewIds.includes(word.id)),
    [words, reviewIds],
  );

  const quizWord = words[quizIndex % words.length] ?? starterWords[0];

  const quizOptions = useMemo(() => {
    const correct = words[quizIndex % words.length] ?? starterWords[0];
    const others = words.filter((word) => word.id !== correct.id).slice(0, 3);

    return [correct, ...others];
  }, [words, quizIndex]);

  function addToReview(id: number) {
    setReviewIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  function removeFromReview(id: number) {
    setReviewIds((prev) => prev.filter((item) => item !== id));
  }

  function saveNote() {
    if (!noteForm.georgian.trim() && !noteForm.meaning.trim()) return;

    const newNote: Note = {
      id: Date.now(),
      ...noteForm,
      createdAt: new Date().toLocaleDateString('tr-TR'),
    };

    setNotes((prev) => [newNote, ...prev]);

    if (noteForm.georgian.trim() && noteForm.meaning.trim()) {
      const newWord: Word = {
        id: Date.now() + 1,
        georgian: noteForm.georgian,
        reading: noteForm.reading,
        meaning: noteForm.meaning,
        category: noteForm.title || 'Benim Notlarım',
      };

      setWords((prev) => [newWord, ...prev]);
    }

    setNoteForm({
      title: '',
      georgian: '',
      reading: '',
      meaning: '',
      note: '',
    });
  }

  function saveWord() {
    if (!wordForm.georgian.trim() || !wordForm.meaning.trim()) return;

    const newWord: Word = {
      id: Date.now(),
      georgian: wordForm.georgian,
      reading: wordForm.reading,
      meaning: wordForm.meaning,
      category: wordForm.category || 'Benim Kelimelerim',
    };

    setWords((prev) => [newWord, ...prev]);

    setWordForm({
      georgian: '',
      reading: '',
      meaning: '',
      category: '',
    });
  }

  function deleteNote(id: number) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  function deleteWord(id: number) {
    setWords((prev) => prev.filter((word) => word.id !== id));
    setReviewIds((prev) => prev.filter((reviewId) => reviewId !== id));
  }

  function nextQuizQuestion() {
    setSelectedAnswer(null);
    setQuizIndex((prev) => prev + 1);
  }

  return (
    <main className="min-h-screen bg-[#efe8dc] text-[#202124]">
      <section className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col bg-[#fbfaf7] shadow-2xl">
        <header className="sticky top-0 z-30 border-b border-black/10 bg-[#fbfaf7]/95 px-5 py-4 shadow-sm backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-[#b91c1c]">Kartuli</h1>
              <p className="text-sm text-black/55">Gürcüce Cep Defterim</p>
            </div>

            <button
              onClick={() => setActiveTab('home')}
              className="rounded-2xl bg-[#b91c1c] px-3 py-2 text-sm font-bold text-white"
            >
              {reviewIds.length} tekrar
            </button>
          </div>
        </header>

        <div className="mobile-scroll-space flex-1 px-5 pt-5">
          {activeTab === 'home' && (
            <div className="space-y-5">
              <div className="rounded-[2rem] bg-[#202124] p-6 text-white shadow-xl">
                <p className="text-sm text-white/65">Günlük çalışma planı</p>
                <h2 className="mt-2 text-3xl font-black leading-tight">Günlük Gürcüce Çalışması</h2>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  Harfleri tekrar edin, kelimeleri gözden geçirin ve mini test ile öğrendiklerinizi pekiştirin.
                </p>
                <button
                  onClick={() => setActiveTab('words')}
                  className="mt-5 w-full rounded-2xl bg-white px-4 py-3 font-bold text-[#202124]"
                >
                  Çalışmaya Başla
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <DashboardCard title="Alfabe" value={`${alphabet.length} harf`} onClick={() => setActiveTab('alphabet')} />
                <DashboardCard title="Kelimeler" value={`${words.length} kelime`} onClick={() => setActiveTab('words')} />
                <DashboardCard title="Cümleler" value={`${starterSentences.length} örnek`} onClick={() => setActiveTab('sentences')} />
                <DashboardCard title="Notlarım" value={`${notes.length} kayıt`} onClick={() => setActiveTab('notes')} />
              </div>

              <div className="rounded-[1.6rem] border border-black/10 bg-white p-5">
                <h3 className="font-black">Günlük Kelime Çalışması</h3>
                <div className="mt-4 space-y-3">
                  {dailyWords.map((word) => (
                    <div key={word.id} className="flex items-center justify-between rounded-2xl bg-[#f7f3ed] px-4 py-3">
                      <div>
                        <p className="georgian-text text-xl font-black">{word.georgian}</p>
                        <p className="text-xs text-black/55">
                          {word.reading} · {word.meaning}
                        </p>
                      </div>
                      <button
                        onClick={() => addToReview(word.id)}
                        className="rounded-xl bg-[#b91c1c] px-3 py-2 text-xs font-bold text-white"
                      >
                        Tekrar Et
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <ReviewBox reviewWords={reviewWords} removeFromReview={removeFromReview} />
            </div>
          )}

          {activeTab === 'alphabet' && (
            <div className="space-y-4">
              <PageTitle title="Alfabe" subtitle="Harfleri kartlar üzerinden düzenli olarak çalışın." />

              <div className="grid grid-cols-2 gap-3">
                {alphabet.map((item) => (
                  <div key={item.letter} className="rounded-[1.6rem] border border-black/10 bg-white p-5 shadow-sm">
                    <p className="georgian-text text-5xl text-[#b91c1c]">{item.letter}</p>
                    <p className="mt-3 font-black">Okunuş: {item.reading}</p>
                    <p className="mt-1 text-sm leading-5 text-black/55">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'words' && (
            <div className="space-y-4">
              <PageTitle title="Kelimeler" subtitle="Anlamı gizleyerek kendinizi test edin." />

              <div className="rounded-[1.8rem] border border-black/10 bg-white p-5 shadow-sm">
                <h3 className="font-black">Yeni Kelime Ekle</h3>

                <div className="mt-4 space-y-3">
                 <GeorgianInput
  label="Gürcüce kelime"
  value={wordForm.georgian}
  onChange={(value) => setWordForm({ ...wordForm, georgian: value })}
/>
                  <Input
                    label="Okunuş"
                    value={wordForm.reading}
                    onChange={(value) => setWordForm({ ...wordForm, reading: value })}
                  />
                  <Input
                    label="Türkçe anlam"
                    value={wordForm.meaning}
                    onChange={(value) => setWordForm({ ...wordForm, meaning: value })}
                  />
                  <Input
                    label="Kategori / ders"
                    value={wordForm.category}
                    onChange={(value) => setWordForm({ ...wordForm, category: value })}
                  />
                </div>

                <button
                  onClick={saveWord}
                  className="mt-5 w-full rounded-2xl bg-[#b91c1c] px-4 py-3 font-black text-white"
                >
                  Kelimeyi Kaydet
                </button>
              </div>

              {words.map((word) => {
                const isShown = shownWordId === word.id;

                return (
                  <div key={word.id} className="rounded-[1.8rem] border border-black/10 bg-white p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="georgian-text text-4xl text-[#202124]">{word.georgian}</p>
                        <p className="mt-1 text-sm text-black/45">{word.category}</p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => addToReview(word.id)}
                          className="rounded-2xl bg-[#f7f3ed] px-3 py-2 text-xs font-black text-[#b91c1c]"
                        >
                          Tekrar Et
                        </button>

                        {word.id > 1000 && (
                          <button
                            onClick={() => deleteWord(word.id)}
                            className="rounded-2xl bg-black/5 px-3 py-2 text-xs font-black text-black/55"
                          >
                            Sil
                          </button>
                        )}
                      </div>
                    </div>

                    {isShown && (
                      <div className="mt-5 rounded-2xl bg-[#f7f3ed] p-4">
                        <p className="text-sm text-black/55">Okunuş</p>
                        <p className="font-black">{word.reading}</p>
                        <p className="mt-3 text-sm text-black/55">Anlam</p>
                        <p className="font-black">{word.meaning}</p>
                      </div>
                    )}

                    <button
                      onClick={() => setShownWordId(isShown ? null : word.id)}
                      className="mt-4 w-full rounded-2xl bg-[#202124] px-4 py-3 font-bold text-white"
                    >
                      {isShown ? 'Gizle' : 'Anlamı Göster'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'sentences' && (
            <div className="space-y-4">
              <PageTitle title="Cümleler" subtitle="Temel cümle yapılarını düzenli olarak çalışın." />

              {starterSentences.map((sentence) => (
                <div key={sentence.id} className="rounded-[1.8rem] border border-black/10 bg-white p-5 shadow-sm">
                  <p className="georgian-text text-2xl text-[#b91c1c]">{sentence.georgian}</p>
                  <p className="mt-3 text-sm text-black/50">Okunuş</p>
                  <p className="font-bold">{sentence.reading}</p>
                  <p className="mt-3 text-sm text-black/50">Anlam</p>
                  <p className="font-bold">{sentence.meaning}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-4">
              <PageTitle title="Notlarım" subtitle="Derste öğrendiğiniz kelime ve cümleleri düzenli şekilde kaydedin." />

              <div className="rounded-[1.8rem] border border-black/10 bg-white p-5 shadow-sm">
                <div className="space-y-3">
                  <Input label="Ders / konu başlığı" value={noteForm.title} onChange={(value) => setNoteForm({ ...noteForm, title: value })} />
                  <GeorgianInput
  label="Gürcüce"
  value={noteForm.georgian}
  onChange={(value) => setNoteForm({ ...noteForm, georgian: value })}
/>
                  <Input label="Okunuş" value={noteForm.reading} onChange={(value) => setNoteForm({ ...noteForm, reading: value })} />
                  <Input label="Türkçe anlam" value={noteForm.meaning} onChange={(value) => setNoteForm({ ...noteForm, meaning: value })} />
                  <Input label="Kendi notunuz" value={noteForm.note} onChange={(value) => setNoteForm({ ...noteForm, note: value })} />
                </div>

                <button onClick={saveNote} className="mt-5 w-full rounded-2xl bg-[#b91c1c] px-4 py-3 font-black text-white">
                  Notu Kaydet
                </button>
              </div>

              {notes.map((note) => (
                <div key={note.id} className="rounded-[1.8rem] border border-black/10 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-black">{note.title || 'Ders Notu'}</h3>
                      <span className="text-xs text-black/45">{note.createdAt}</span>
                    </div>

                    <button
                      onClick={() => deleteNote(note.id)}
                      className="rounded-xl bg-black/5 px-3 py-2 text-xs font-black text-black/55"
                    >
                      Sil
                    </button>
                  </div>

                  <p className="georgian-text mt-4 text-3xl text-[#b91c1c]">{note.georgian}</p>
                  <p className="mt-2 text-sm text-black/50">{note.reading}</p>
                  <p className="mt-2 font-bold">{note.meaning}</p>
                  {note.note && <p className="mt-3 rounded-2xl bg-[#f7f3ed] p-3 text-sm text-black/70">{note.note}</p>}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="space-y-4">
              <PageTitle title="Mini Test" subtitle="İlk ders kelimeleriyle hızlı kontrol çalışması." />

              <div className="rounded-[1.8rem] border border-black/10 bg-white p-5 shadow-sm">
                <p className="text-sm text-black/50">Bu kelime ne anlama gelir?</p>
                <p className="georgian-text mt-4 text-5xl text-[#b91c1c]">{quizWord.georgian}</p>

                <div className="mt-6 space-y-3">
                  {quizOptions.map((option) => {
                    const isSelected = selectedAnswer === option.id;
                    const isCorrect = option.id === quizWord.id;

                    return (
                      <button
                        key={option.id}
                        onClick={() => {
                          setSelectedAnswer(option.id);
                          if (!isCorrect) addToReview(quizWord.id);
                        }}
                        className={`w-full rounded-2xl border px-4 py-4 text-left font-black ${
                          isSelected
                            ? isCorrect
                              ? 'border-green-300 bg-green-50'
                              : 'border-red-300 bg-red-50'
                            : 'border-black/10 bg-[#f7f3ed]'
                        }`}
                      >
                        {option.meaning}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer !== null && (
                  <div className="mt-5 rounded-2xl bg-[#202124] p-4 text-white">
                    <p className="font-bold">
                      {selectedAnswer === quizWord.id ? 'Doğru cevap.' : 'Bu kelime tekrar kutusuna eklendi.'}
                    </p>

                    <button
                      onClick={nextQuizQuestion}
                      className="mt-4 w-full rounded-2xl bg-white px-4 py-3 font-black text-[#202124]"
                    >
                      Sonraki Soru
                    </button>
                  </div>
                )}
              </div>

              <ReviewBox reviewWords={reviewWords} removeFromReview={removeFromReview} />
            </div>
          )}
        </div>

        <nav className="fixed bottom-4 left-1/2 z-40 grid w-[calc(100%-28px)] max-w-[402px] -translate-x-1/2 grid-cols-6 rounded-[1.5rem] border border-black/10 bg-white/95 px-2 py-2 shadow-2xl backdrop-blur">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-2xl px-1 py-3 text-[11px] font-black ${
                activeTab === tab.id ? 'bg-[#b91c1c] text-white' : 'text-black/55'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </section>
    </main>
  );
}

function DashboardCard({ title, value, onClick }: { title: string; value: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="min-h-[96px] rounded-[1.6rem] border border-black/10 bg-white p-5 text-left shadow-sm">
      <p className="text-sm text-black/45">{title}</p>
      <p className="mt-2 text-xl font-black">{value}</p>
    </button>
  );
}

function PageTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-3xl font-black tracking-tight">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-black/55">{subtitle}</p>
    </div>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-bold text-black/60">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-black/10 bg-[#f7f3ed] px-4 py-3 font-bold outline-none focus:border-[#b91c1c]"
      />
    </label>
  );
}

function ReviewBox({
  reviewWords,
  removeFromReview,
}: {
  reviewWords: Word[];
  removeFromReview: (id: number) => void;
}) {
  return (
    <div className="rounded-[1.6rem] border border-black/10 bg-white p-5">
      <h3 className="font-black">Tekrar kutusu</h3>

      {reviewWords.length === 0 ? (
        <p className="mt-2 text-sm text-black/55">Şu anda tekrar edilmesi gereken kelime bulunmuyor.</p>
      ) : (
        <div className="mt-4 space-y-2">
          {reviewWords.map((word) => (
            <div key={word.id} className="flex items-center justify-between rounded-2xl border border-black/10 px-4 py-3">
              <div>
                <span className="georgian-text block font-bold">{word.georgian}</span>
                <span className="text-xs text-black/50">{word.meaning}</span>
              </div>
              <button onClick={() => removeFromReview(word.id)} className="text-sm font-bold text-[#b91c1c]">
                Öğrendim
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


function GeorgianInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  function addCharacter(character: string) {
    onChange(value + character);
  }

  function removeLastCharacter() {
    onChange(value.slice(0, -1));
  }

  function addSpace() {
    onChange(value + ' ');
  }

  return (
    <label className="block">
      <span className="mb-1 block text-sm font-bold text-black/60">{label}</span>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="georgian-text w-full rounded-2xl border border-black/10 bg-[#f7f3ed] px-4 py-3 font-bold outline-none focus:border-[#b91c1c]"
      />

      <div className="mt-3 rounded-2xl border border-black/10 bg-white p-3">
        <p className="mb-3 text-xs font-bold text-black/50">Gürcüce klavye</p>

        <div className="space-y-2">
          {georgianKeyboardRows.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-7 gap-2">
              {row.map((character) => (
                <button
                  key={character}
                  type="button"
                  onClick={() => addCharacter(character)}
                  className="georgian-text rounded-xl bg-[#f7f3ed] px-2 py-2 text-lg text-[#202124]"
                >
                  {character}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={addSpace}
            className="rounded-xl bg-[#202124] px-3 py-2 text-sm font-bold text-white"
          >
            Boşluk
          </button>

          <button
            type="button"
            onClick={removeLastCharacter}
            className="rounded-xl bg-black/5 px-3 py-2 text-sm font-bold text-black/60"
          >
            Sil
          </button>
        </div>
      </div>
    </label>
  );
}

