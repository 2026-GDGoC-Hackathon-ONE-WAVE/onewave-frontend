import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faPlus,
  faXmark,
  faHouseChimney,
  faLayerGroup,
  faChartPie,
  faUser,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';

const Experiences = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. 기업 리스트 상태 관리 (토스, 당근, 구글 3종 데이터 탑재)
  const [experienceList, setExperienceList] = useState([
    {
      id: 1,
      company: '토스 (비바리퍼블리카)',
      date: '2025.02.14',
      tag: 'Product Designer',
      status: '최종 탈락',
      step: '최종 임원 면접',
      progress: '회고 중',
      imgUrl:
        'https://gmcnqdpighpxhzpesqwf.supabase.co/storage/v1/object/public/generated-images/image-d7b8662c-63fe-458a-bdfd-57de8cf7580f.jpg',
      simpleMemo:
        '면접 분위기가 매우 유연하고 수평적이었음. 사용자 데이터 기반의 의사결정 과정을 깊게 물어보셨음.',
    },
    {
      id: 2,
      company: '당근 (당근마켓)',
      date: '2025.01.28',
      tag: 'UX Researcher',
      status: '1차 탈락',
      step: '직무 역량 인터뷰',
      progress: '회고 전',
      isStart: true,
      imgUrl:
        'https://gmcnqdpighpxhzpesqwf.supabase.co/storage/v1/object/public/generated-images/image-3a9fbdb2-4f0b-4eab-81c5-57234478e64e.jpg',
      simpleMemo: '성능 최적화와 컴포넌트 재사용성에 대한 질문이 핵심이었음.',
    },
    {
      id: 3,
      company: '구글 코리아(Google)',
      date: '2025.12.01',
      tag: 'Software Engineer',
      status: '최종 합격',
      step: '기술 인터뷰',
      progress: '회고 완료',
      imgUrl:
        'https://gmcnqdpighpxhzpesqwf.supabase.co/storage/v1/object/public/generated-images/image-2eea60f6-d195-4d92-94f6-767fca02f7b1.jpg',
      simpleMemo:
        '자료구조와 알고리즘 위주의 질문이 많았음. 특히 대규모 트래픽 처리 경험에 대해 깊게 논의했는데, 논리적으로 설명하여 긍정적인 반응을 얻음.',
    },
  ]);

  // 2. 새 경험 입력 폼 상태 관리
  const [newExp, setNewExp] = useState({
    company: '',
    date: '',
    tag: '',
    step: '서류 전형',
    simpleMemo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExp((prev) => ({ ...prev, [name]: value }));
  };

  // 3. 새로운 경험 추가 함수
  const handleAddExperience = () => {
    if (!newExp.company || !newExp.tag) {
      alert('회사명과 직무를 입력해주세요!');
      return;
    }

    const nextId = Date.now();
    const addedExp = {
      id: nextId,
      company: newExp.company,
      date: newExp.date || '2025.02.07',
      tag: newExp.tag,
      status: '서류 탈락',
      step: newExp.step,
      progress: '회고 전',
      isStart: true,
      imgUrl:
        'https://gmcnqdpighpxhzpesqwf.supabase.co/storage/v1/object/public/generated-images/image-2eea60f6-d195-4d92-94f6-767fca02f7b1.jpg',
      simpleMemo: newExp.simpleMemo,
    };

    setExperienceList([addedExp, ...experienceList]);
    setIsModalOpen(false);
    setNewExp({
      company: '',
      date: '',
      tag: '',
      step: '서류 전형',
      simpleMemo: '',
    });
  };

  return (
    <div className="ui-screen bg-[#F8F9FD]">
      <div
        id="app"
        className="relative w-full min-h-screen font-['Pretendard'] overflow-x-hidden pb-32"
      >
        <main className="w-full max-w-[1200px] mx-auto px-6 py-12">
          {/* --- Hero CTA Section --- */}
          <section className="relative w-full h-[240px] bg-gradient-to-br from-[#1E1B4B] to-[#312E81] rounded-[32px] mb-12 overflow-hidden flex items-center justify-between px-16 shadow-2xl">
            <div className="relative z-10 text-left">
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                아직 정리되지 않은
                <br />
                <span className="text-[#DFFF00]">
                  {
                    experienceList.filter((e) => e.progress !== '회고 완료')
                      .length
                  }
                  개의 경험
                </span>
                이 기다리고 있어요.
              </h1>
              <button className="group flex items-center gap-3 bg-[#DFFF00] hover:bg-[#EFFF50] text-[#1E1B4B] px-8 py-4 rounded-full font-black text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl">
                최근 경험 돌아보기
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
            <div className="relative w-[300px] h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent blur-3xl"></div>
              <img
                className="relative z-10 w-[280px] h-[280px] object-contain drop-shadow-2xl"
                src="https://gmcnqdpighpxhzpesqwf.supabase.co/storage/v1/object/public/generated-images/image-ad8159ae-7156-4170-a7f7-c11960fee2e9.jpg"
                alt="Illustration"
              />
            </div>
          </section>

          {/* --- Experience Grid --- */}
          <div className="grid grid-cols-3 gap-8">
            <div
              onClick={() => setIsModalOpen(true)}
              className="group relative bg-white border-2 border-dashed border-gray-200 rounded-[28px] p-8 flex flex-col items-center justify-center gap-6 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer min-h-[420px]"
            >
              <div className="w-20 h-20 bg-gray-50 group-hover:bg-indigo-100 rounded-full flex items-center justify-center transition-colors">
                <FontAwesomeIcon
                  icon={faPlus}
                  className="text-3xl text-gray-400 group-hover:text-indigo-600"
                />
              </div>
              <div className="text-center text-left">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  새로운 경험 추가하기
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  잊기 전에 당신의 소중한
                  <br />
                  성장 기록을 남겨보세요.
                </p>
              </div>
            </div>

            {experienceList.map((exp) => (
              <ExperienceCard key={exp.id} {...exp} />
            ))}
          </div>
        </main>

        {/* --- 하단 네비게이션 --- */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-gray-100 px-8 py-4 rounded-full shadow-2xl flex items-center gap-10 z-40">
          <NavBtn icon={faHouseChimney} label="홈" active />
          <NavBtn icon={faLayerGroup} label="경험함" />
          <div
            onClick={() => setIsModalOpen(true)}
            className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-lg -mt-2 hover:scale-110 transition-transform cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlus} className="text-xl" />
          </div>
          <NavBtn icon={faChartPie} label="통계" />
          <NavBtn icon={faUser} label="마이" />
        </div>

        {/* --- 새 경험 추가 모달 --- */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-[550px] rounded-[32px] p-10 shadow-2xl animate-in fade-in zoom-in duration-200 overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-gray-900">
                  새 경험 추가
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FontAwesomeIcon icon={faXmark} className="text-xl" />
                </button>
              </div>

              <div className="space-y-6 text-left">
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">
                    회사/조직명
                  </label>
                  <input
                    name="company"
                    value={newExp.company}
                    onChange={handleChange}
                    type="text"
                    placeholder="예: 토스"
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">
                      면접 본 날짜
                    </label>
                    <input
                      name="date"
                      value={newExp.date}
                      onChange={handleChange}
                      type="text"
                      placeholder="2025-02-01"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-400 mb-2">
                      지원 직무
                    </label>
                    <input
                      name="tag"
                      value={newExp.tag}
                      onChange={handleChange}
                      type="text"
                      placeholder="예: Product Designer"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2">
                    탈락한 전형
                  </label>
                  <div className="relative">
                    <select
                      name="step"
                      value={newExp.step}
                      onChange={handleChange}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium appearance-none cursor-pointer"
                    >
                      <option>서류 전형</option>
                      <option>과제/코딩 테스트</option>
                      <option>1차 면접</option>
                      <option>2차 면접</option>
                      <option>최종 면접</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="text-xs"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    간단 메모
                  </label>
                  <textarea
                    name="simpleMemo"
                    value={newExp.simpleMemo}
                    onChange={handleChange}
                    rows="3"
                    placeholder="면접 당시 느꼈던 점이나 특징을 간단히 적어주세요."
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium resize-none"
                  ></textarea>
                </div>
                <button
                  onClick={handleAddExperience}
                  className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-lg hover:bg-black transition-all mt-4 shadow-xl active:scale-[0.98]"
                >
                  경험 저장하고 시작하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ExperienceCard = ({
  company,
  date,
  tag,
  status,
  step,
  progress,
  imgUrl,
  isStart,
  simpleMemo,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate('/experience-detail', {
          state: { company, tag, date, step, progress, simpleMemo },
        })
      }
      className="bg-white rounded-[28px] p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between min-h-[420px] cursor-pointer text-left"
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden border border-gray-100 shrink-0">
              <img src={imgUrl} className="w-8 h-8 object-contain" alt="Logo" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-black text-gray-900 truncate">
                {company}
              </h3>
              <p className="text-xs font-medium text-gray-400">{date}</p>
            </div>
          </div>
          <div
            className={`px-2 py-1 rounded-full text-[12px] font-bold border whitespace-nowrap shrink-0 ${status.includes('최종') ? 'bg-red-50 text-red-500 border-red-100' : 'bg-gray-100 text-gray-500 border-gray-200'}`}
          >
            {status}
          </div>
        </div>
        <div className="space-y-4">
          <span className="inline-block px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-bold">
            {tag}
          </span>
          <div className="p-4 bg-gray-50 rounded-2xl mt-4">
            <p className="text-xs font-bold text-gray-400 uppercase mb-2">
              탈락 전형
            </p>
            <p className="text-gray-900 font-bold">{step}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-2.5 h-2.5 rounded-full ${progress === '회고 완료' ? 'bg-[#D946EF]' : progress === '회고 중' ? 'bg-orange-400 animate-pulse' : 'bg-gray-300'}`}
          ></div>
          <span className="text-sm font-bold text-gray-700">{progress}</span>
        </div>
        <button
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${progress === '회고 완료' ? 'bg-[#D946EF] text-white shadow-lg' : isStart ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-900 text-white'}`}
        >
          {progress === '회고 완료'
            ? '결과 보기'
            : isStart
              ? '회고 시작'
              : '이어하기'}
        </button>
      </div>
    </div>
  );
};

const NavBtn = ({ icon, label, active }) => (
  <button
    className={`flex flex-col items-center gap-1 ${active ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'} transition-colors text-left`}
  >
    <FontAwesomeIcon icon={icon} className="text-xl" />
    <span className="text-[10px] font-black">{label}</span>
  </button>
);

export default Experiences;
