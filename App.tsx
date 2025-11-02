import React, { useState } from 'react';
import { ChatbotWidget } from './components/ChatbotWidget';

// Helper component for section titles
interface SectionTitleProps {
  children: React.ReactNode;
}
const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
    <h2 className="text-3xl lg:text-4xl font-bold font-montserrat text-brand-maroon text-center">
        {children}
    </h2>
);

// Card component for reuse
interface InfoCardProps {
  icon: string;
  title: string;
  text: string;
}
const InfoCard = ({ icon, title, text }: InfoCardProps) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center h-full transform hover:-translate-y-2 transition-transform duration-300">
        <div className="text-5xl mb-5 inline-block">{icon}</div>
        <h3 className="text-xl font-bold font-montserrat mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600">{text}</p>
    </div>
);

// Modal component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                className="bg-white p-8 rounded-2xl shadow-xl relative max-w-lg w-full m-4" 
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-3xl leading-none font-bold"
                    aria-label="Close modal"
                >
                    &times;
                </button>
                <h3 id="modal-title" className="text-2xl font-bold font-montserrat text-brand-maroon mb-2 text-center">{title}</h3>
                <div className="prose max-w-none text-gray-700">{children}</div>
            </div>
        </div>
    );
};


const App: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState<{ title: string; body: React.ReactNode }>({ title: '', body: null });
    const [isChatOpen, setIsChatOpen] = useState(false);

    const handleOpenModal = (data: {title: string, body: React.ReactNode}) => {
        setModalContent(data);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Component for the "Bài giảng điện tử" modal content
    const BaiGiangModalBody = () => {
        const topics = {
            'chu-de-1': {
                name: 'Chủ đề 1: Thế giới Trong và sau chiến tranh lạnh',
                lessons: [
                    { id: 'bai-1-1', name: 'Bài 1: Liên hợp quốc', link: 'https://drive.google.com/file/d/1PP32mpxS0qLbm6ssCz30xdrrGKN0MF9Y/view' },
                    { id: 'bai-1-2', name: 'Bài 2: Trật tự thế giới trong chiến tranh lạnh', link: 'https://docs.google.com/presentation/d/1YSgvmP-avAN3z53ZEDhdCrg5foyVEeGJ/edit?slide=id.p1#slide=id.p1' },
                    { id: 'bai-1-3', name: 'Bài 3: Trật tự thế giới sau chiến tranh', link: 'https://drive.google.com/file/d/1uYiBvV6nONbb_nzGBRs4YyDJK-QBR_YA/view' },
                ]
            },
            'chu-de-2': {
                name: 'Chủ đề 2: ASEAN những chặng đường Lịch sử',
                lessons: [
                    { id: 'bai-2-4', name: 'Bài 4: Sự ra đời và phát triển của Hiệp hội các quốc gia Đông Nam Á ( ASEAN)', link: '#' },
                    { id: 'bai-2-5', name: 'Bài 5: Cộng đồng ASEAN : Từ ý tưởng đến hiện thực', link: '#' },
                ]
            }
        };

        const [selectedTopic, setSelectedTopic] = useState('');
        const [selectedLesson, setSelectedLesson] = useState('');

        const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedTopic(e.target.value);
            setSelectedLesson(''); // Reset lesson selection when topic changes
        };

        const handleViewLesson = () => {
            if (!selectedTopic || !selectedLesson) return;
            
            const topic = topics[selectedTopic as keyof typeof topics];
            const lesson = topic.lessons.find(l => l.id === selectedLesson);

            if (lesson && lesson.link !== '#') {
                window.open(lesson.link, '_blank', 'noopener,noreferrer');
            } else {
                alert("Nội dung cho bài học này chưa có sẵn.");
            }
        };

        return (
            <div className="text-center">
                <p className="mb-6 text-base">Vui lòng chọn một chủ đề từ danh sách bên dưới để xem chi tiết.</p>
                <div className="space-y-4">
                    <select
                        value={selectedTopic}
                        onChange={handleTopicChange}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-maroon/50"
                        aria-label="Chọn chủ đề bài giảng"
                    >
                        <option value="" disabled>-- Chọn một chủ đề --</option>
                        {Object.entries(topics).map(([key, topic]) => (
                            <option key={key} value={key}>{topic.name}</option>
                        ))}
                    </select>

                    {selectedTopic && (
                        <select
                            value={selectedLesson}
                            onChange={(e) => setSelectedLesson(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-maroon/50"
                            aria-label="Chọn bài học"
                        >
                            <option value="" disabled>-- Chọn một bài học --</option>
                            {topics[selectedTopic as keyof typeof topics].lessons.map((lesson) => (
                                <option key={lesson.id} value={lesson.id}>{lesson.name}</option>
                            ))}
                        </select>
                    )}
                </div>

                <button
                    onClick={handleViewLesson}
                    disabled={!selectedLesson}
                    className="mt-8 w-full bg-brand-maroon text-white font-bold py-4 px-6 rounded-full text-lg hover:bg-red-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
                >
                    Xem ngay
                </button>
            </div>
        );
    };
    
    // Component for the "Bản đồ tư duy & Timeline" modal content
    const TuDuyTimelineModalBody = () => {
        const tuDuyTopics = {
            'chu-de-1': {
                name: 'Chủ đề 1: Thế giới trong và sau Chiến tranh lạnh',
                link: 'https://drive.google.com/file/d/1V3FZaiBrYedHVGgJrAUGueDZCLc3PUGX/view?usp=sharing'
            },
            'chu-de-2': {
                name: 'Chủ đề 2: ASEAN những chặng đường lịch sử',
                link: 'https://drive.google.com/file/d/1tGTFOd1-uOENIN7zRt8XfTaUzQ8QsOwh/view?usp=sharing'
            },
            'chu-de-3': {
                name: 'Chủ đề 3: Cách mạng tháng tám năm 1945',
                link: 'https://drive.google.com/file/d/1RUDWqd8NaOV7EPykdBufq_8UkXsEoJBe/view?usp=sharing'
            },
            'chu-de-4': {
                name: 'Chủ đề 4: Công cuộc đổi mới ở Việt Nam từ 1986 đến nay',
                link: 'https://drive.google.com/file/d/1zf7LtC_QeXKeRUIFdudMaxbN-Xvy3iHy/view?usp=sharing'
            },
            'chu-de-5': {
                name: 'Chủ đề 5: Lịch sử đối ngoại của Việt Nam thời cận - hiện đại',
                link: 'https://drive.google.com/file/d/12LnWGs_CPQciYAjAsQ77rVs3WuqPrb85/view?usp=sharing'
            },
            'chu-de-6': {
                name: 'Chủ đề 6: Hồ Chí Minh trong lịch sử Việt Nam',
                link: 'https://drive.google.com/file/d/1Eco1u47C5UDOB-OQ3JIkUb9bPJwa21FC/view?usp=sharing'
            },
        };

        const [contentType, setContentType] = useState(''); // 'sodotuduy' or 'timeline'
        const [selectedTopic, setSelectedTopic] = useState('');
        const [viewContent, setViewContent] = useState<{title: string, content: string} | null>(null);

        const handleContentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setContentType(e.target.value);
            setSelectedTopic('');
            setViewContent(null);
        };
        
        const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedTopic(e.target.value);
        };

        const handleViewContent = () => {
            if (!contentType || !selectedTopic) return;
            
            let topicData;
            if (contentType === 'sodotuduy') {
                topicData = tuDuyTopics[selectedTopic as keyof typeof tuDuyTopics];
            }
            
            if (topicData) {
                if ((topicData as any).link) {
                    window.open((topicData as any).link, '_blank', 'noopener,noreferrer');
                } else if ((topicData as any).content) {
                    setViewContent({title: topicData.name, content: (topicData as any).content});
                } else {
                    alert("Nội dung chưa có sẵn.");
                }
            } else {
                alert("Nội dung chưa có sẵn.");
            }
        };

        const handleBack = () => {
            setViewContent(null);
        };

        if (viewContent) {
            return (
                <div>
                    <button onClick={handleBack} className="mb-4 text-sm text-brand-maroon font-bold hover:underline">&larr; Quay lại chọn chủ đề</button>
                    <h4 className="text-xl font-bold font-montserrat text-brand-maroon mb-2">{viewContent.title}</h4>
                    <p>{viewContent.content}</p>
                </div>
            )
        }

        return (
            <div className="text-center">
                <p className="mb-6 text-base">Vui lòng chọn một nội dung từ danh sách bên dưới để xem chi tiết.</p>
                <div className="space-y-4">
                    <select
                        value={contentType}
                        onChange={handleContentTypeChange}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-maroon/50"
                        aria-label="Chọn nội dung cần xem"
                    >
                        <option value="" disabled>-- Chọn nội dung cần xem --</option>
                        <option value="sodotuduy">Sơ đồ tư duy</option>
                        <option value="timeline">Timeline</option>
                    </select>

                    {contentType === 'sodotuduy' && (
                        <select
                            value={selectedTopic}
                            onChange={handleTopicChange}
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-maroon/50"
                            aria-label="Chọn chủ đề sơ đồ tư duy"
                        >
                            <option value="" disabled>-- Chọn một chủ đề --</option>
                            {Object.entries(tuDuyTopics).map(([key, topic]) => (
                                <option key={key} value={key}>{topic.name}</option>
                            ))}
                        </select>
                    )}

                    {contentType === 'timeline' && (
                         <div className="text-gray-500 p-4 border rounded-lg bg-gray-50">Nội dung Timeline sắp ra mắt. Vui lòng quay lại sau.</div>
                    )}
                </div>

                <button
                    onClick={handleViewContent}
                    disabled={!selectedTopic || contentType !== 'sodotuduy'}
                    className="mt-8 w-full bg-brand-maroon text-white font-bold py-4 px-6 rounded-full text-lg hover:bg-red-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
                >
                    Xem
                </button>
            </div>
        );
    };

    // Component for the "Bài tập lịch sử" modal content
    const BaiTapLichSuModalBody = () => {
        const exerciseCategories = {
            'trac-nghiem-chu-de': {
                name: 'Bài tập trắc nghiệm theo chủ đề nhiều lựa chọn',
                link: '#'
            },
            'trac-nghiem-dung-sai': {
                name: 'Trắc nghiệm đúng - sai',
                link: '#'
            },
            'tu-luan': {
                name: 'Bài tập tự luận',
                link: '#'
            },
            'de-luyen-thi': {
                name: 'Đề luyện thi thử tốt nghiệp',
                link: 'https://drive.google.com/drive/u/0/folders/1qZMU_FOMAhKNLySPKhyNONz0OkhBjV9v'
            }
        };

        const [selectedCategory, setSelectedCategory] = useState('');

        const handleViewExercise = () => {
            if (!selectedCategory) return;
            const category = exerciseCategories[selectedCategory as keyof typeof exerciseCategories];
            if (category && category.link !== '#') {
                window.open(category.link, '_blank', 'noopener,noreferrer');
            } else {
                alert("Nội dung cho danh mục này chưa có sẵn.");
            }
        };

        const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            setSelectedCategory(e.target.value);
        };

        return (
            <div className="text-center">
                <p className="mb-6 text-base">Vui lòng chọn một danh mục tài liệu từ danh sách bên dưới để xem chi tiết.</p>
                <div className="space-y-4">
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-maroon/50"
                        aria-label="Chọn danh mục bài tập"
                    >
                        <option value="" disabled>-- Chọn một danh mục --</option>
                        {Object.entries(exerciseCategories).map(([key, category]) => (
                            <option key={key} value={key}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleViewExercise}
                    disabled={!selectedCategory}
                    className="mt-8 w-full bg-brand-maroon text-white font-bold py-4 px-6 rounded-full text-lg hover:bg-red-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
                >
                    Xem
                </button>
            </div>
        );
    };

    const resources = [
        {
            name: 'Bài giảng điện tử',
            isModal: true,
            modalData: {
                title: 'Chọn Bài giảng điện tử',
                body: <BaiGiangModalBody />
            }
        },
        {
            name: 'Bài tập lịch sử',
            isModal: true,
            modalData: {
                title: 'Chọn danh mục Bài tập',
                body: <BaiTapLichSuModalBody />
            }
        },
        { 
            name: 'Bản đồ tư duy & Timeline', 
            isModal: true,
            modalData: {
                title: 'Chọn nội dung cần xem',
                body: <TuDuyTimelineModalBody />
            }
        },
        { name: 'Tư liệu lịch sử địa phương', link: '#' },
        { name: 'Trò chơi & Quiz', link: '#' },
        { name: 'Video bài giảng ngắn', link: '#' },
    ];

    return (
        <div className="bg-white">
            <header className="bg-brand-maroon relative">
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="container mx-auto px-6 py-24 text-center text-white relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black font-montserrat mb-4 tracking-tight">KHÁM PHÁ LỊCH SỬ – NUÔI DƯỠNG LÒNG YÊU NƯỚC!</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto font-nunito">
                        Học liệu số môn Lịch sử 12 – Chương trình GDPT 2018 dành cho giáo viên và học sinh THPT.
                    </p>
                    <div className="mt-8 flex justify-center items-center gap-4 flex-wrap">
                        <button onClick={() => document.getElementById('resources')?.scrollIntoView()} className="bg-white text-brand-maroon font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
                            Khám phá ngay
                        </button>
                         <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white hover:text-brand-maroon transition-all duration-300 transform hover:scale-105">
                            Tải học liệu miễn phí
                        </button>
                    </div>
                </div>
            </header>
            <div className="bg-brand-maroon text-white overflow-hidden">
                <p className="py-2 font-times text-[30px] whitespace-nowrap animate-marquee-rtl">
                    Trường PT Dân tộc nội trú THPT tỉnh Bình Phước - Tổ chuyên môn TDQP - Sử - Địa - GDKTPL
                </p>
            </div>

            <main>
                <section id="why-us" className="py-16 lg:py-24 bg-brand-yellow">
                    <div className="container mx-auto px-6">
                        <SectionTitle>Tại sao nên chọn học liệu số Lịch sử 12?</SectionTitle>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                            <InfoCard 
                                icon="🎓" 
                                title="Giáo viên dạy dễ hơn" 
                                text="Học liệu biên soạn theo GDPT 2018, tích hợp đa phương tiện, hỗ trợ soạn giảng hiệu quả."
                            />
                             <InfoCard 
                                icon="📱" 
                                title="Học sinh hứng thú hơn" 
                                text="Video, infographic, và trò chơi tương tác giúp việc học Lịch sử trở nên sống động và thú vị."
                            />
                             <InfoCard 
                                icon="🌍" 
                                title="Lịch sử gắn liền thực tế" 
                                text="Nội dung được cập nhật thường xuyên, gắn liền với các chuyên đề và lịch sử địa phương."
                            />
                        </div>
                    </div>
                </section>

                <section id="resources" className="py-16 lg:py-24 bg-white">
                    <div className="container mx-auto px-6 text-center">
                        <SectionTitle>Kho học liệu – "Tất cả tài nguyên bạn cần"</SectionTitle>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
                           Khám phá kho tài nguyên đa dạng, từ bài giảng điện tử, phiếu học tập đến các trò chơi trắc nghiệm Lịch sử 12.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 text-left">
                             {resources.map((item) => (
                                <div key={item.name} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col justify-between items-start">
                                    <h3 className="text-xl font-bold font-montserrat text-gray-800">{item.name}</h3>
                                    <div className="mt-4">
                                        {'isModal' in item && item.isModal ? (
                                            <button
                                                onClick={() => handleOpenModal(item.modalData)}
                                                className="bg-brand-maroon text-white font-bold py-2 px-6 rounded-full hover:bg-red-800 transition duration-300"
                                            >
                                                Xem chi tiết
                                            </button>
                                        ) : (
                                            <a
                                                href={(item as {link: string}).link}
                                                target={(item as {link: string}).link.startsWith('http') ? '_blank' : undefined}
                                                rel={(item as {link:string}).link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                                className="bg-brand-maroon text-white font-bold py-2 px-6 rounded-full hover:bg-red-800 transition duration-300 inline-block"
                                            >
                                                Xem chi tiết
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-16">
                             <button className="bg-green-600 text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                                Tải trọn bộ học liệu (Miễn phí)
                            </button>
                        </div>
                    </div>
                </section>
                
                <section id="experience" className="py-16 lg:py-24 bg-brand-yellow">
                    <div className="container mx-auto px-6">
                        <SectionTitle>Dạy – Học – Trải nghiệm cùng nhau</SectionTitle>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
                            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                                <h3 className="text-2xl font-bold font-montserrat text-brand-maroon mb-4"> Dành cho giáo viên</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    <li>Giáo án mẫu, hoạt động lớp, công cụ đánh giá năng lực.</li>
                                    <li>Hướng dẫn ứng dụng CNTT (Canva, Quizizz, Google Form...).</li>
                                </ul>
                            </div>
                             <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                                <h3 className="text-2xl font-bold font-montserrat text-brand-maroon mb-4"> Dành cho học sinh</h3>
                                 <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    <li>Kho video bài giảng ngắn (5-10 phút).</li>
                                    <li>Bài luyện trắc nghiệm theo từng chuyên đề.</li>
                                    <li>Mục "Thử thách lịch sử" (gamification).</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact" className="py-16 lg:py-24 bg-brand-yellow">
                    <div className="container mx-auto px-6">
                        <SectionTitle>Góp ý & Liên hệ</SectionTitle>
                        <p className="mt-4 text-center text-lg text-gray-600 italic max-w-2xl mx-auto">"Dân ta phải biết sử ta,<br/>Cho tường gốc tích nước nhà Việt Nam."<br/>– Hồ Chí Minh</p>
                        <div className="mt-10 max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Tên của bạn</label>
                                        <input type="text" id="name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-maroon/50"/>
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                        <input type="email" id="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-maroon/50"/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="role" className="block text-sm font-bold text-gray-700 mb-2">Bạn là</label>
                                    <select id="role" className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-maroon/50">
                                        <option>Học sinh</option>
                                        <option>Giáo viên</option>
                                        <option>Phụ huynh</option>
                                        <option>Khác</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Nội dung góp ý</label>
                                    <textarea id="message" rows={5} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-maroon/50"></textarea>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="bg-brand-maroon text-white font-bold py-3 px-10 rounded-full text-lg hover:bg-red-800 transition-all duration-300 transform hover:scale-105">Gửi góp ý</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 text-white">
                <div className="container mx-auto px-6 py-10 text-center">
                    <h3 className="text-xl font-bold font-montserrat">Thông tin giảng viên</h3>
                    <div className="mt-4 text-gray-300 space-y-1">
                        <p>Võ Văn Dũng - 25 năm kinh nghiệm giảng dạy Lịch sử THPT</p>
                        <p>Trường PT DTNT THPT Bình Phước, tỉnh Bình Phước</p>
                        <p>ĐT: 0907130900 | Zalo: 0907130900</p>
                    </div>
                    <div className="mt-6 flex justify-center gap-6">
                        <a href="#" className="hover:text-yellow-300 transition">Facebook</a>
                        <a href="#" className="hover:text-yellow-300 transition">Zalo</a>
                        <a href="#" className="hover:text-yellow-300 transition">Youtube</a>
                    </div>
                    <div className="mt-8 border-t border-gray-700 pt-6 text-sm text-gray-400">
                        <p>&copy; 2025 - Dự án học liệu số Lịch sử 12. Phát triển vì cộng đồng.</p>
                    </div>
                </div>
            </footer>
            
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={modalContent.title}>
                {modalContent.body}
            </Modal>

            {/* Chatbot Feature */}
            <ChatbotWidget isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
            <button
                onClick={() => setIsChatOpen(true)}
                className={`fixed bottom-5 right-5 sm:right-10 z-50 bg-brand-maroon text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transform transition-transform duration-300 hover:scale-110 ${isChatOpen ? 'scale-0' : 'scale-100'}`}
                aria-label="Mở Sử Bot"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 5.589 2 10c0 2.908 1.897 5.515 5 6.934V22l5.34-4.005C17.064 17.582 22 14.132 22 10c0-4.411-4.486-8-10-8zm0 14c-4.411 0-8-2.691-8-6s3.589-6 8-6 8 2.691 8 6-3.589 6-8 6z"/><path d="M9.5 9c-.828 0-1.5.672-1.5 1.5S8.672 12 9.5 12s1.5-.672 1.5-1.5S10.328 9 9.5 9zm5 0c-.828 0-1.5.672-1.5 1.5S13.672 12 14.5 12s1.5-.672 1.5-1.5S15.328 9 14.5 9z"/></svg>
            </button>
        </div>
    );
};

export default App;