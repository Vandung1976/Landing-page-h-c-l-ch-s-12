import React from 'react';

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


const App: React.FC = () => {
    
    const resources = [
        { name: 'Bài giảng điện tử', link: '#' },
        { name: 'Bài tập lịch sử', link: '#' },
        { name: 'Bản đồ tư duy & Timeline', link: '#' },
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
                        <button onClick={() => document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-brand-maroon font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
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
                                        <a
                                            href={item.link}
                                            className="bg-brand-maroon text-white font-bold py-2 px-6 rounded-full hover:bg-red-800 transition duration-300 inline-block"
                                        >
                                            Xem chi tiết
                                        </a>
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
        </div>
    );
};

export default App;
