import React, { useEffect, useMemo, useState } from 'react';

function formatMonthLabel(yyyyMm) {
  if (!yyyyMm) return '';
  const [y, m] = yyyyMm.split('-');
  return `${y}.${m}`;
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [raw, setRaw] = useState(null);

  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      setErrorMsg('');

      try {
        const json = {
          status: 200,
          success: true,
          message: '대시보드 데이터 조회 성공',
          data: {
            userId: 1,
            summary: {
              totalReflections: 42,
              thisMonthReflections: 15,
            },
            stageFailureRates: [
              {
                stage: '최종 면접',
                failureCount: 28,
                totalCount: 42,
                failureRate: 68,
                description:
                  '답변 질문에 대한 답이가 부족해 행했던 경험이 있어',
              },
              {
                stage: '코딩 테스트',
                failureCount: 18,
                totalCount: 42,
                failureRate: 42,
                description: '시간 관리 해내지서 말을 뱉지 않이 말고 말야',
              },
              {
                stage: '서류 전형',
                failureCount: 8,
                totalCount: 42,
                failureRate: 18,
                description: '지원 적합도 기하드는 비중 당청하게',
              },
            ],
            topKeywords: [
              { keyword: '성장', count: 12 },
              { keyword: '몰입', count: 8 },
              { keyword: '성취', count: 6 },
            ],
            monthlyReflectionCount: [
              { month: '2025-01', count: 8 },
              { month: '2025-02', count: 15 },
              { month: '2025-03', count: 19 },
            ],
          },
        };

        if (!json?.success) throw new Error(json?.message || '조회 실패');
        setRaw(json.data);
      } catch (e) {
        setErrorMsg(e?.message || '알 수 없는 오류');
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, []);

  const summary = raw?.summary;
  const total = summary?.totalReflections ?? 0;
  const thisMonth = summary?.thisMonthReflections ?? 0;

  // Get sorted failure rates
  const stageFailureRates = useMemo(() => {
    if (!raw?.stageFailureRates) return [];
    return [...raw.stageFailureRates].sort((a, b) => b.failureRate - a.failureRate);
  }, [raw]);

  const topKeywords = raw?.topKeywords || [];
  const monthly = useMemo(() => raw?.monthlyReflectionCount ?? [], [raw]);

  const maxMonthlyCount = useMemo(() => {
    const counts = monthly.map((m) => m.count || 0);
    return Math.max(1, ...counts);
  }, [monthly]);

  return (
    <div className="min-h-screen w-full bg-[#F4F7FF] font-['Pretendard'] pb-20">
      {/* Title Section */}
      <section className="bg-white border-b border-slate-100">
        <div className="mx-auto max-w-[1200px] px-6 py-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
              패턴 인사이트 대시보드
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              회고 데이터를 기반으로 반복되는 나의 패턴을 확인하세요.
            </p>
          </div>
          <button className="bg-[#0F172A] text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-black/10">
            <i className="fa-solid fa-download" />
            리포트 추출
          </button>
        </div>
      </section>

      <main className="px-6 py-10">
        <div className="mx-auto max-w-[1200px] space-y-8">
          {/* Loading / Error */}
          {isLoading && (
            <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm text-slate-600">
              불러오는 중…
            </div>
          )}

          {!isLoading && errorMsg && (
            <div className="bg-white rounded-[32px] border border-red-100 p-8 shadow-sm">
              <p className="font-black text-red-600 mb-2">조회 실패</p>
              <p className="text-slate-600">{errorMsg}</p>
              <button
                type="button"
                className="mt-6 px-5 py-3 rounded-2xl bg-indigo-600 text-white font-bold"
                onClick={() => window.location.reload()}
              >
                새로고침
              </button>
            </div>
          )}

          {!isLoading && !errorMsg && raw && (
            <>
              {/* Summary cards */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total */}
                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                      누적 회고
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center">
                      <i className="fa-solid fa-layer-group text-purple-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-4xl font-black text-[#0F172A]">
                      {total}
                    </span>
                    <span className="text-lg font-bold text-slate-500">건</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500 font-medium">
                    지금까지 기록한 회고의 총합이에요.
                  </p>
                </div>

                {/* This month */}
                <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-bold text-sm uppercase tracking-widest">
                      이번 달 회고
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                      <i className="fa-solid fa-calendar-check text-emerald-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-4xl font-black text-[#0F172A]">
                      {thisMonth}
                    </span>
                    <span className="text-lg font-bold text-slate-500">건</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500 font-medium">
                    이번 달에 작성한 회고 수예요.
                  </p>
                </div>

                {/* Stage Failure Rates */}
                <div className="bg-[#0F172A] p-6 rounded-[32px] shadow-xl text-white relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-[2px]" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-slate-300 font-bold text-sm uppercase tracking-widest">
                        자주 흔들린 전형 단계
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                        <i className="fa-solid fa-chart-line text-pink-400 text-sm" />
                      </div>
                    </div>
                    
                    <div className="space-y-5">
                      {stageFailureRates.map((s, idx) => {
                        const colors = [
                          'bg-gradient-to-r from-rose-500 to-pink-500',
                          'bg-gradient-to-r from-orange-400 to-amber-500',
                          'bg-gradient-to-r from-indigo-400 to-violet-500',
                          'bg-gradient-to-r from-emerald-400 to-teal-500'
                        ];
                        const barColor = colors[idx % colors.length];

                        return (
                          <div key={s.stage} className="space-y-2">
                            <div className="flex justify-between items-end">
                              <span className="text-sm font-bold text-slate-200">{s.stage}</span>
                              <span className="text-lg font-black text-white">{s.failureRate}%</span>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${barColor} transition-all duration-1000`} 
                                style={{ width: `${s.failureRate}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <p className="mt-6 text-xs text-slate-400 font-medium leading-relaxed">
                      상위 단계일수록 더 많은 주의와 회고가 필요해요.
                    </p>
                  </div>
                </div>
              </section>

              {/* Main grid */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Monthly chart */}
                <div className="lg:col-span-8 bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black text-[#0F172A]">
                      월별 회고 작성 수
                    </h3>
                    <div className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                      최근 {monthly.length}개월
                    </div>
                  </div>

                  {monthly.length === 0 ? (
                    <div className="text-slate-500 text-sm">
                      아직 월별 데이터가 없어요.
                    </div>
                  ) : (
                    <div className="h-[280px] w-full flex items-end gap-4">
                      {monthly.map((m) => {
                        const ratio = (m.count / maxMonthlyCount) * 100;
                        return (
                          <div
                            key={m.month}
                            className="flex-1 min-w-0 flex flex-col items-center gap-3"
                          >
                            <div className="w-full max-w-[56px]">
                              <div className="w-full h-[220px] bg-slate-50 rounded-t-2xl border border-slate-100 overflow-hidden flex items-end">
                                <div
                                  className="w-full bg-gradient-to-t from-[#8B5CF6] to-[#C084FC] rounded-t-2xl"
                                  style={{ height: `${Math.max(6, ratio)}%` }}
                                  title={`${m.count}건`}
                                />
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="text-xs font-bold text-slate-500">
                                {formatMonthLabel(m.month)}
                              </p>
                              <p className="text-[11px] text-slate-400 font-semibold">
                                {m.count}건
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Top keywords */}
                <div className="lg:col-span-4 bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black text-[#0F172A]">
                      Top 키워드
                    </h3>
                    <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center">
                      <i className="fa-solid fa-hashtag text-indigo-500" />
                    </div>
                  </div>

                  {topKeywords.length === 0 ? (
                    <p className="text-sm text-slate-500">
                      아직 키워드 데이터가 없어요.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {topKeywords.map((k, idx) => {
                        const max = Math.max(1, topKeywords[0]?.count || 1);
                        const pct = Math.round((k.count / max) * 100);
                        const isTop = idx === 0;

                        return (
                          <div
                            key={k.keyword}
                            className="p-4 rounded-3xl border border-slate-100 bg-slate-50"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span
                                className={
                                  isTop
                                    ? 'text-[#8B5CF6] font-black'
                                    : 'text-slate-700 font-bold'
                                }
                              >
                                #{k.keyword}
                              </span>
                              <span className="text-slate-400 text-sm font-bold">
                                {k.count}회
                              </span>
                            </div>

                            <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-slate-100">
                              <div
                                className={
                                  isTop
                                    ? 'h-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]'
                                    : 'h-full bg-gradient-to-r from-slate-400 to-slate-500'
                                }
                                style={{ width: `${pct}%` }}
                              />
                            </div>

                            <p className="mt-2 text-[11px] text-slate-500 font-medium">
                              {isTop
                                ? '가장 자주 반복된 키워드예요.'
                                : '최근 회고에서 자주 등장했어요.'}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
