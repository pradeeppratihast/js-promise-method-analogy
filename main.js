const slides = [
            {
                title: "JavaScript Promise Methods",
                subtitle: "The Recruitment Analogy",
                content: "Think of a Promise as an Interview Invitation. You've sent the invite, and now you're waiting for the result.",
                icon: "📩",
                color: "from-blue-500 to-indigo-600"
            },
            {
                id: "all",
                title: "Promise.all()",
                subtitle: "The Startup Team",
                description: "Hiring a Designer, Dev, and Manager.",
                logic: "Wait for ALL candidates to say 'Yes'.",
                failure: "If even ONE says 'No', the whole launch is cancelled!",
                icon: "🤝",
                color: "from-emerald-500 to-teal-600",
                visual: `<div class="flex gap-4 justify-center">
                            <div class="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl border-2 border-emerald-400">🎨</div>
                            <div class="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl border-2 border-emerald-400">💻</div>
                            <div class="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-2xl border-2 border-emerald-400">👔</div>
                         </div>`
            },
            {
                id: "allSettled",
                title: "Promise.allSettled()",
                subtitle: "The HR Report",
                description: "Recording every single interview result.",
                logic: "Wait for everyone to finish, regardless of outcome.",
                failure: "Never fails. It records every 'Yes' and 'No' equally.",
                icon: "📋",
                color: "from-purple-500 to-pink-600",
                visual: `<div class="space-y-2 text-left bg-black/20 p-4 rounded-lg font-mono text-xs">
                            <div class="text-green-400">✓ Candidate A: HIRED</div>
                            <div class="text-red-400">✗ Candidate B: REJECTED</div>
                            <div class="text-green-400">✓ Candidate C: HIRED</div>
                         </div>`
            },
            {
                id: "any",
                title: "Promise.any()",
                subtitle: "AI Race",
                description: "Need an AI Engineer with Math & Python foundations.",
                logic: "Take the FIRST qualified candidate who says 'Yes'.",
                failure: "Only fails if every single person rejects the offer.",
                icon: "🚀",
                color: "from-orange-500 to-red-600",
                visual: `<div class="relative w-full h-12 bg-white/10 rounded-full overflow-hidden">
                            <div class="absolute top-0 left-0 h-full w-2/3 bg-orange-500 flex items-center justify-end px-4">
                                <span class="text-sm font-bold">First 'Yes' Wins! 🏆</span>
                            </div>
                         </div>`
            },
            {
                id: "race",
                title: "Promise.race()",
                subtitle: "Fastest Finger First",
                description: "Hiring the very first person who replies.",
                logic: "First result wins, whether it's success or failure.",
                failure: "If the first person is a mess, the whole race fails.",
                icon: "⏱️",
                color: "from-cyan-500 to-blue-600",
                visual: `<div class="flex items-center gap-4">
                            <div class="text-4xl animate-bounce">🏃</div>
                            <div class="flex-1 h-1 bg-white/20 rounded"></div>
                            <div class="text-xl">🏁</div>
                         </div>`
            },
            {
                title: "Summary Table",
                subtitle: "Recruitment Logic at a Glance",
                isTable: true,
                color: "from-slate-700 to-slate-800"
            }
        ];

        let currentSlide = 0;
        const mainContent = document.getElementById('main-content');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const stepCounter = document.getElementById('step-counter');
        const progressHeader = document.querySelector('.fixed.top-0');

        function initProgress() {
            progressHeader.innerHTML = slides.map((_, i) => `
                <div class="h-1 flex-1 bg-slate-800 rounded-full overflow-hidden">
                    <div id="progress-${i}" class="h-full bg-blue-500 progress-bar w-0"></div>
                </div>
            `).join('');
        }

        function renderSlide() {
            const slide = slides[currentSlide];
            
            // Reset animation
            mainContent.classList.remove('slide-enter');
            void mainContent.offsetWidth; 
            mainContent.classList.add('slide-enter');

            // Update Progress
            slides.forEach((_, i) => {
                const bar = document.getElementById(`progress-${i}`);
                if (i < currentSlide) bar.style.width = '100%';
                else if (i === currentSlide) bar.style.width = '100%';
                else bar.style.width = '0%';
            });

            if (slide.isTable) {
                mainContent.innerHTML = `
                    <div class="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 shadow-2xl">
                        <h2 class="text-3xl font-bold mb-6 text-center">Quick Summary</h2>
                        <div class="overflow-x-auto">
                            <table class="w-full text-left">
                                <thead class="border-b border-slate-700 text-slate-400">
                                    <tr>
                                        <th class="py-3 px-2">Method</th>
                                        <th class="py-3 px-2">Goal</th>
                                        <th class="py-3 px-2">Failure Impact</th>
                                    </tr>
                                </thead>
                                <tbody class="text-sm">
                                    <tr class="border-b border-slate-800"><td class="py-4 px-2 font-bold text-emerald-400">all()</td><td class="py-4">Full Team</td><td class="py-4">One 'No' cancels all.</td></tr>
                                    <tr class="border-b border-slate-800"><td class="py-4 px-2 font-bold text-purple-400">allSettled()</td><td class="py-4">Full Report</td><td class="py-4">Records everything.</td></tr>
                                    <tr class="border-b border-slate-800"><td class="py-4 px-2 font-bold text-orange-400">any()</td><td class="py-4">First 'Yes'</td><td class="py-4">Ignores 'No's if possible.</td></tr>
                                    <tr><td class="py-4 px-2 font-bold text-cyan-400">race()</td><td class="py-4">Speed</td><td class="py-4">First response determines all.</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            } else if (!slide.id) {
                mainContent.innerHTML = `
                    <div class="text-center space-y-6">
                        <div class="text-8xl mb-8">${slide.icon}</div>
                        <h1 class="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${slide.color}">
                            ${slide.title}
                        </h1>
                        <p class="text-xl text-slate-400 max-w-2xl mx-auto">${slide.content || slide.subtitle}</p>
                    </div>
                `;
            } else {
                mainContent.innerHTML = `
                    <div class="grid md:grid-cols-2 gap-8 items-center">
                        <div class="space-y-6">
                            <div class="inline-block px-4 py-1 rounded-full bg-slate-800 text-sm font-mono text-slate-400 border border-slate-700">
                                ${slide.title}
                            </div>
                            <h2 class="text-5xl font-bold">${slide.subtitle}</h2>
                            <p class="text-slate-400 text-lg">${slide.description}</p>
                            
                            <div class="space-y-4">
                                <div class="flex gap-4 items-start">
                                    <div class="mt-1 text-blue-500">🎯</div>
                                    <p><strong class="block text-slate-200">The Logic</strong> ${slide.logic}</p>
                                </div>
                                <div class="flex gap-4 items-start">
                                    <div class="mt-1 text-red-500">⚠️</div>
                                    <p><strong class="block text-slate-200">Failure Case</strong> ${slide.failure}</p>
                                </div>
                            </div>
                        </div>
                        <div class="relative group">
                            <div class="absolute -inset-1 bg-gradient-to-r ${slide.color} rounded-3xl blur opacity-25"></div>
                            <div class="relative bg-slate-800 border border-slate-700 p-8 rounded-3xl h-64 flex flex-col justify-center items-center gap-8 shadow-2xl">
                                ${slide.visual}
                                <div class="text-6xl">${slide.icon}</div>
                            </div>
                        </div>
                    </div>
                `;
            }

            // Update Controls
            prevBtn.disabled = currentSlide === 0;
            nextBtn.innerText = currentSlide === slides.length - 1 ? "Finish" : "Next";
            stepCounter.innerText = `${currentSlide + 1} / ${slides.length}`;
        }

        nextBtn.addEventListener('click', () => {
            if (currentSlide < slides.length - 1) {
                currentSlide++;
                renderSlide();
            } else {
                // Final interaction
                mainContent.innerHTML = `
                    <div class="text-center animate-bounce">
                        <div class="text-8xl mb-6">🎉</div>
                        <h2 class="text-4xl font-bold">You're a Promise Pro!</h2>
                    </div>
                    <button onclick="location.reload()" class="mt-8 text-blue-400 hover:underline">Replay Overview</button>
                `;
                nextBtn.style.display = 'none';
                prevBtn.style.display = 'none';
                stepCounter.style.display = 'none';
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentSlide > 0) {
                currentSlide--;
                renderSlide();
            }
        });

        // Initialize
        initProgress();
        renderSlide();