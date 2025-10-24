import React from 'react';

// Reusable components
const Card = ({ icon, title, text }: { icon: string; title: string; text: string }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="font-montserrat text-xl font-bold text-brand-maroon mb-2">{title}</h3>
        <p className="text-gray-600">{text}</p>
    </div>
);

const SectionTitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <div className="text-center mb-12">
        <h2 className="font-montserrat text-4xl font-extrabold text-brand-maroon">{title}</h2>
        <p className="text-lg text-gray-500 mt-2">{subtitle}</p>
    </div>
);


const App: React.FC = () => {

    // Helper for rendering sections
    const renderSection = (id: string, className: string, children: React.ReactNode) => (
        <section id={id} className={`py-16 md:py-24 ${className}`}>
            <div className="container mx-auto px-4">
                {children}
            </div>
        </section>
    );

    return (
        <div className="bg-white">
            {/* 1. Hero Section */}
            <header className="bg-brand-maroon text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                 {/* Placeholder for background image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{backgroundImage: "url('https://images.unsplash.com/photo-1596783226388-d6a455a0b5f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"}}
                ></div>
                <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
                    <h1 className="font-montserrat text-5xl md:text-7xl font-black uppercase tracking-wider">Khám phá lịch sử – Nuôi dưỡng lòng yêu nước!</h1>
                    <p className="mt-4 text-lg md:text-xl max-w-3xl">Học liệu số môn Lịch sử 12 – Chương trình GDPT 2018 dành cho giáo viên và học sinh THPT.</p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <a href="#kho-hoc-lieu" className="bg-brand-yellow text-brand-maroon font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition-colors duration-300 shadow-lg">Khám phá ngay</a>
                        <a href="#kho-hoc-lieu" className="bg-transparent border-2 border-brand-yellow text-brand-yellow font-bold py-3 px-8 rounded-full text-lg hover:bg-brand-yellow hover:text-brand-maroon transition-colors duration-300">Tải học liệu miễn phí</a>
                    </div>
                </div>
            </header>
            
            <main>
                {/* 2. Giới thiệu dự án */}
                {renderSection("gioi-thieu", "bg-gray-50", 
                    <>
                        <SectionTitle title="Tại sao nên chọn học liệu số Lịch sử 12?" subtitle="Những ưu điểm vượt trội giúp việc dạy và học trở nên hiệu quả hơn." />
                        <div className="grid md:grid-cols-3 gap-8">
                            <Card icon="🎓" title="Giáo viên dạy dễ hơn" text="Học liệu được biên soạn theo Chương trình GDPT 2018, tích hợp đa phương tiện và được cập nhật định kỳ." />
                            <Card icon="📱" title="Học sinh học hứng thú hơn" text="Tích hợp video, infographic, và các trò chơi tương tác giúp bài học trở nên sinh động và dễ tiếp thu." />
                            <Card icon="🌍" title="Lịch sử gắn liền thực tế" text="Học liệu được cập nhật theo chuyên đề, chủ đề, bài học thực tế tại các địa phương (Đồng Nai, Bình Phước…)." />
                        </div>
                    </>
                )}

                {/* 3. Kho học liệu */}
                {renderSection("kho-hoc-lieu", "bg-brand-yellow",
                    <>
                        <SectionTitle title="Kho học liệu" subtitle="Tất cả tài nguyên bạn cần – chỉ trong một nơi." />
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
                            {['Bài giảng điện tử', 'Phiếu học tập', 'Bản đồ tư duy', 'Tư liệu lịch sử địa phương', 'Trò chơi - Quiz', 'Bộ học liệu trọn gói'].map(item => (
                                <div key={item} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                    <h3 className="font-montserrat text-xl font-bold text-gray-800 mb-4">{item}</h3>
                                    <button className="bg-brand-maroon text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-colors duration-300">Xem & Tải</button>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* 4. Hỗ trợ giáo viên & học sinh */}
                {renderSection("ho-tro", "bg-white",
                    <>
                        <SectionTitle title="Dạy – Học – Trải nghiệm cùng nhau" subtitle="Tài nguyên chuyên biệt cho từng đối tượng." />
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                            <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                                <h3 className="font-montserrat text-3xl font-bold text-brand-maroon mb-4">👩‍🏫 Dành cho giáo viên:</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    <li>Giáo án mẫu, hoạt động lớp, công cụ đánh giá năng lực.</li>
                                    <li>Hướng dẫn ứng dụng CNTT (Canva, Quizizz, Google Form, Padlet...).</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                                <h3 className="font-montserrat text-3xl font-bold text-brand-maroon mb-4">🧑‍🎓 Dành cho học sinh:</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                    <li>Kho video bài giảng ngắn (5–10 phút).</li>
                                    <li>Bài luyện trắc nghiệm theo từng chuyên đề.</li>
                                    <li>Mục “Thử thách lịch sử” (gamified quiz).</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}

                {/* 5. Trải nghiệm tương tác */}
                {renderSection("tuong-tac", "bg-gray-50",
                    <>
                        <SectionTitle title="Học qua công nghệ" subtitle="Trải nghiệm Lịch sử một cách sống động và trực quan." />
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {['Bản đồ chiến dịch 3D', 'Bảng xếp hạng học tập', 'Video 360° di tích', 'Thực tế ảo (AR/VR)'].map(item => (
                                <div key={item} className="bg-white p-6 rounded-lg shadow-lg text-center">
                                    <div className="text-3xl mb-4">✨</div>
                                    <h3 className="font-montserrat text-xl font-bold text-brand-maroon">{item}</h3>
                                    <p className="text-gray-500 mt-2">Tính năng sắp ra mắt</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                
                {/* 6. Cảm hứng & Liên hệ */}
                {renderSection("lien-he", "bg-brand-maroon text-white",
                    <>
                        <div className="text-center">
                            <h2 className="font-montserrat text-3xl font-bold">Lịch sử – Hành trình của ký ức và khát vọng.</h2>
                            <blockquote className="mt-4 text-xl italic text-brand-yellow">“Dân ta phải biết sử ta, cho tường gốc tích nước nhà Việt Nam.”</blockquote>
                            <p className="text-gray-300">- Chủ tịch Hồ Chí Minh -</p>
                        </div>
                        <div className="max-w-2xl mx-auto mt-12 bg-white text-gray-800 p-8 rounded-lg shadow-2xl">
                            <h3 className="font-montserrat text-2xl font-bold text-center mb-6">Góp ý xây dựng học liệu</h3>
                            <form className="space-y-4">
                                <input type="text" placeholder="Tên của bạn" className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon" />
                                <input type="email" placeholder="Email" className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon" />
                                <select className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon">
                                    <option>Bạn là Giáo viên</option>
                                    <option>Bạn là Học sinh</option>
                                    <option>Khác</option>
                                </select>
                                <textarea placeholder="Nội dung góp ý..." rows={4} className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon"></textarea>
                                <button type="submit" className="w-full bg-brand-maroon text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors duration-300">Gửi góp ý</button>
                            </form>
                        </div>
                    </>
                )}
            </main>

            <footer className="bg-gray-800 text-white py-8">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; {new Date().getFullYear()} - Dự án học liệu số Lịch sử 12. Phát triển vì cộng đồng.</p>
                    <div className="flex justify-center gap-6 mt-4">
                       <a href="#" className="hover:text-brand-yellow">Facebook</a>
                       <a href="#" className="hover:text-brand-yellow">Zalo</a>
                       <a href="#" className="hover:text-brand-yellow">Youtube</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
