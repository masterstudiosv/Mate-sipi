// Tab Management
        function openTab(evt, tabName) {
            const tabContents = document.getElementsByClassName('tab-content');
            const tabBtns = document.getElementsByClassName('tab-btn');
            
            for (let i = 0; i < tabContents.length; i++) {
                tabContents[i].classList.remove('active');
            }
            
            for (let i = 0; i < tabBtns.length; i++) {
                tabBtns[i].classList.remove('active');
            }
            
            document.getElementById(tabName).classList.add('active');
            evt.currentTarget.classList.add('active');
        }

        // PARÁBOLA
        function calculateParabola() {
            const p = parseFloat(document.getElementById('p_par').value);
            if (isNaN(p) || p <= 0) {
                alert('❌ Ingresa un valor válido para p > 0');
                return;
            }

            const result = `
                <div class="result-box">
                    <h3>🎯 Resultados de la Parábola</h3>
                    <ul>
                        <li><strong>Vértice:</strong> (0, 0)</li>
                        <li><strong>Foco:</strong> (0, ${p.toFixed(2)})</li>
                        <li><strong>Directriz:</strong> y = -${p.toFixed(2)}</li>
                        <li><strong>Extremos latus rectum:</strong> (±${(2*p).toFixed(2)}, ${p.toFixed(2)})</li>
                        <li><strong>Longitud latus rectum:</strong> ${(4*p).toFixed(2)} unidades</li>
                        <li><strong>Ecuación:</strong> y = ${(1/(4*p)).toFixed(4)}x²</li>
                    </ul>
                </div>
            `;
            document.getElementById('parabolaResult').innerHTML = result;
            drawParabola(p);
        }

        function drawParabola(p) {
            const canvas = document.getElementById('parabolaCanvas');
            const ctx = canvas.getContext('2d');
            const w = canvas.width = 600;
            const h = canvas.height = 400;
            
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, w, h);
            
            const scale = 30;
            const centerX = w / 2;
            const centerY = h / 2;
            
            // Ejes
            ctx.strokeStyle = '#475569';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, centerY);
            ctx.lineTo(w, centerY);
            ctx.moveTo(centerX, 0);
            ctx.lineTo(centerX, h);
            ctx.stroke();
            
            // Parábola
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 3;
            ctx.beginPath();
            for (let x = -10; x <= 10; x += 0.1) {
                const y = (1/(4*p)) * x * x;
                const px = centerX + x * scale;
                const py = centerY - y * scale;
                if (x === -10) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.stroke();
            
            // Foco
            ctx.fillStyle = '#ec4899';
            ctx.beginPath();
            ctx.arc(centerX, centerY - p * scale, 6, 0, Math.PI * 2);
            ctx.fill();
            
            // Directriz
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(0, centerY + p * scale);
            ctx.lineTo(w, centerY + p * scale);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // ELIPSE
        function calculateEllipse() {
            const a = parseFloat(document.getElementById('a_ell').value);
            const b = parseFloat(document.getElementById('b_ell').value);
            
            if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
                alert('❌ Ingresa valores válidos mayores a 0');
                return;
            }
            
            const c = Math.sqrt(Math.abs(a*a - b*b));
            const e = c / Math.max(a, b);
            
            const result = `
                <div class="result-box">
                    <h3>🎯 Resultados de la Elipse</h3>
                    <ul>
                        <li><strong>Vértices:</strong> (±${a.toFixed(2)}, 0)</li>
                        <li><strong>Co-vértices:</strong> (0, ±${b.toFixed(2)})</li>
                        <li><strong>Focos:</strong> (±${c.toFixed(2)}, 0)</li>
                        <li><strong>Eje mayor:</strong> ${(2*a).toFixed(2)}</li>
                        <li><strong>Eje menor:</strong> ${(2*b).toFixed(2)}</li>
                        <li><strong>Excentricidad:</strong> ${e.toFixed(4)}</li>
                    </ul>
                </div>
            `;
            document.getElementById('ellipseResult').innerHTML = result;
            drawEllipse(a, b);
        }

        function drawEllipse(a, b) {
            const canvas = document.getElementById('ellipseCanvas');
            const ctx = canvas.getContext('2d');
            const w = canvas.width = 600;
            const h = canvas.height = 400;
            
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, w, h);
            
            const scale = Math.min(w / (2.5 * a), h / (2.5 * b));
            const centerX = w / 2;
            const centerY = h / 2;
            
            // Ejes
            ctx.strokeStyle = '#475569';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, centerY);
            ctx.lineTo(w, centerY);
            ctx.moveTo(centerX, 0);
            ctx.lineTo(centerX, h);
            ctx.stroke();
            
            // Elipse
            ctx.strokeStyle = '#8b5cf6';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.ellipse(centerX, centerY, a * scale, b * scale, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            // Focos
            const c = Math.sqrt(Math.abs(a*a - b*b));
            ctx.fillStyle = '#ec4899';
            ctx.beginPath();
            ctx.arc(centerX - c * scale, centerY, 6, 0, Math.PI * 2);
            ctx.arc(centerX + c * scale, centerY, 6, 0, Math.PI * 2);
            ctx.fill();
        }

        // HIPÉRBOLA
        function calculateHyperbola() {
            const a = parseFloat(document.getElementById('a_hyp').value);
            const b = parseFloat(document.getElementById('b_hyp').value);
            
            if (isNaN(a) || isNaN(b)) {
                alert('❌ Ingresa valores válidos');
                return;
            }
            
            const c = Math.sqrt(a*a + b*b);
            const e = c / a;
            
            const result = `
                <div class="result-box">
                    <h3>🎯 Resultados de la Hipérbola</h3>
                    <ul>
                        <li><strong>Vértices:</strong> (±${a.toFixed(2)}, 0)</li>
                        <li><strong>Focos:</strong> (±${c.toFixed(2)}, 0)</li>
                        <li><strong>Excentricidad:</strong> ${e.toFixed(4)}</li>
                        <li><strong>Asíntotas:</strong> y = ±${(b/a).toFixed(4)}x</li>
                    </ul>
                </div>
            `;
            document.getElementById('hyperbolaResult').innerHTML = result;
            drawHyperbola(a, b);
        }

        function drawHyperbola(a, b) {
            const canvas = document.getElementById('hyperbolaCanvas');
            const ctx = canvas.getContext('2d');
            const w = canvas.width = 600;
            const h = canvas.height = 400;
            
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, w, h);
            
            const scale = 30;
            const centerX = w / 2;
            const centerY = h / 2;
            
            // Ejes
            ctx.strokeStyle = '#475569';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, centerY);
            ctx.lineTo(w, centerY);
            ctx.moveTo(centerX, 0);
            ctx.lineTo(centerX, h);
            ctx.stroke();
            
            // Asíntotas
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            const slope = b / a;
            ctx.beginPath();
            ctx.moveTo(0, centerY - slope * (centerX / scale) * scale);
            ctx.lineTo(w, centerY + slope * (centerX / scale) * scale);
            ctx.moveTo(0, centerY + slope * (centerX / scale) * scale);
            ctx.lineTo(w, centerY - slope * (centerX / scale) * scale);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Hipérbola
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 3;
            ctx.beginPath();
            for (let x = a; x <= 10; x += 0.1) {
                const y = b * Math.sqrt((x*x)/(a*a) - 1);
                ctx.lineTo(centerX + x * scale, centerY - y * scale);
            }
            for (let x = 10; x >= a; x -= 0.1) {
                const y = b * Math.sqrt((x*x)/(a*a) - 1);
                ctx.lineTo(centerX + x * scale, centerY + y * scale);
            }
            ctx.stroke();
            
            ctx.beginPath();
            for (let x = -a; x >= -10; x -= 0.1) {
                const y = b * Math.sqrt((x*x)/(a*a) - 1);
                ctx.lineTo(centerX + x * scale, centerY - y * scale);
            }
            for (let x = -10; x <= -a; x += 0.1) {
                const y = b * Math.sqrt((x*x)/(a*a) - 1);
                ctx.lineTo(centerX + x * scale, centerY + y * scale);
            }
            ctx.stroke();
        }

        // DISTANCIA
        function calculateDistance() {
            const x1 = parseFloat(document.getElementById('x1').value);
            const y1 = parseFloat(document.getElementById('y1').value);
            const x2 = parseFloat(document.getElementById('x2').value);
            const y2 = parseFloat(document.getElementById('y2').value);
            
            const dist = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
            const slope = (y2-y1) / (x2-x1);
            const midX = (x1+x2) / 2;
            const midY = (y1+y2) / 2;
            
            const result = `
                <div class="result-box">
                    <h3>🎯 Resultados</h3>
                    <ul>
                        <li><strong>Distancia:</strong> ${dist.toFixed(4)} unidades</li>
                        <li><strong>Pendiente:</strong> ${isFinite(slope) ? slope.toFixed(4) : '∞ (vertical)'}</li>
                        <li><strong>Punto medio:</strong> (${midX.toFixed(2)}, ${midY.toFixed(2)})</li>
                        <li><strong>Ángulo:</strong> ${(Math.atan(slope) * 180 / Math.PI).toFixed(2)}°</li>
                    </ul>
                </div>
            `;
            document.getElementById('distanceResult').innerHTML = result;
            drawDistance(x1, y1, x2, y2, midX, midY);
        }

        function drawDistance(x1, y1, x2, y2, midX, midY) {
            const canvas = document.getElementById('distanceCanvas');
            const ctx = canvas.getContext('2d');
            const w = canvas.width = 600;
            const h = canvas.height = 400;
            
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, w, h);
            
            const scale = 30;
            const centerX = w / 2;
            const centerY = h / 2;
            
            // Ejes
            ctx.strokeStyle = '#475569';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, centerY);
            ctx.lineTo(w, centerY);
            ctx.moveTo(centerX, 0);
            ctx.lineTo(centerX, h);
            ctx.stroke();
            
            // Línea
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(centerX + x1 * scale, centerY - y1 * scale);
            ctx.lineTo(centerX + x2 * scale, centerY - y2 * scale);
            ctx.stroke();
            
            // Puntos
            ctx.fillStyle = '#ec4899';
            ctx.beginPath();
            ctx.arc(centerX + x1 * scale, centerY - y1 * scale, 8, 0, Math.PI * 2);
            ctx.arc(centerX + x2 * scale, centerY - y2 * scale, 8, 0, Math.PI * 2);
            ctx.fill();
            
            // Punto medio
            ctx.fillStyle = '#10b981';
            ctx.beginPath();
            ctx.arc(centerX + midX * scale, centerY - midY * scale, 6, 0, Math.PI * 2);
            ctx.fill();
        }

        // TRIÁNGULOS
        function calculateTriangle() {
            const a = parseFloat(document.getElementById('cateto_a').value) || null;
            const b = parseFloat(document.getElementById('cateto_b').value) || null;
            const c = parseFloat(document.getElementById('hipotenusa').value) || null;
            
            let result = '';
            
            if (a && b) {
                const h = Math.sqrt(a*a + b*b);
                const angleA = Math.atan(a/b) * 180 / Math.PI;
                const angleB = Math.atan(b/a) * 180 / Math.PI;
                result = `
                    <div class="result-box">
                        <h3>🎯 Resultados</h3>
                        <ul>
                            <li><strong>Hipotenusa:</strong> ${h.toFixed(4)}</li>
                            <li><strong>Ángulo A:</strong> ${angleA.toFixed(2)}°</li>
                            <li><strong>Ángulo B:</strong> ${angleB.toFixed(2)}°</li>
                            <li><strong>sin(A):</strong> ${(a/h).toFixed(4)}</li>
                            <li><strong>cos(A):</strong> ${(b/h).toFixed(4)}</li>
                            <li><strong>tan(A):</strong> ${(a/b).toFixed(4)}</li>
                        </ul>
                    </div>
                `;
            } else if (a && c) {
                const b = Math.sqrt(c*c - a*a);
                result = `
                    <div class="result-box">
                        <h3>🎯 Resultados</h3>
                        <ul>
                            <li><strong>Cateto b:</strong> ${b.toFixed(4)}</li>
                            <li><strong>Ángulo A:</strong> ${(Math.asin(a/c) * 180 / Math.PI).toFixed(2)}°</li>
                        </ul>
                    </div>
                `;
            } else if (b && c) {
                const a = Math.sqrt(c*c - b*b);
                result = `
                    <div class="result-box">
                        <h3>🎯 Resultados</h3>
                        <ul>
                            <li><strong>Cateto a:</strong> ${a.toFixed(4)}</li>
                            <li><strong>Ángulo B:</strong> ${(Math.asin(b/c) * 180 / Math.PI).toFixed(2)}°</li>
                        </ul>
                    </div>
                `;
            } else {
                alert('❌ Ingresa al menos 2 valores');
                return;
            }
            
            document.getElementById('triangleResult').innerHTML = result;
        }

        // VECTORES
        function calculateVectors() {
            const va_i = parseFloat(document.getElementById('va_i').value);
            const va_j = parseFloat(document.getElementById('va_j').value);
            const va_k = parseFloat(document.getElementById('va_k').value);
            const vb_i = parseFloat(document.getElementById('vb_i').value);
            const vb_j = parseFloat(document.getElementById('vb_j').value);
            const vb_k = parseFloat(document.getElementById('vb_k').value);
            
            // Suma
            const sum_i = va_i + vb_i;
            const sum_j = va_j + vb_j;
            const sum_k = va_k + vb_k;
            
            // Resta
            const dif_i = va_i - vb_i;
            const dif_j = va_j - vb_j;
            const dif_k = va_k - vb_k;
            
            // Producto punto
            const dot = va_i * vb_i + va_j * vb_j + va_k * vb_k;
            
            // Producto cruz
            const cross_i = va_j * vb_k - va_k * vb_j;
            const cross_j = va_k * vb_i - va_i * vb_k;
            const cross_k = va_i * vb_j - va_j * vb_i;
            
            // Magnitudes
            const magA = Math.sqrt(va_i**2 + va_j**2 + va_k**2);
            const magB = Math.sqrt(vb_i**2 + vb_j**2 + vb_k**2);
            
            // Ángulo
            const angle = Math.acos(dot / (magA * magB)) * 180 / Math.PI;
            
            const result = `
                <div class="result-box">
                    <h3>🎯 Operaciones Vectoriales</h3>
                    <ul>
                        <li><strong>A + B:</strong> (${sum_i.toFixed(2)}, ${sum_j.toFixed(2)}, ${sum_k.toFixed(2)})</li>
                        <li><strong>A - B:</strong> (${dif_i.toFixed(2)}, ${dif_j.toFixed(2)}, ${dif_k.toFixed(2)})</li>
                        <li><strong>A · B (producto punto):</strong> ${dot.toFixed(4)}</li>
                        <li><strong>A × B (producto cruz):</strong> (${cross_i.toFixed(2)}, ${cross_j.toFixed(2)}, ${cross_k.toFixed(2)})</li>
                        <li><strong>|A| (magnitud de A):</strong> ${magA.toFixed(4)}</li>
                        <li><strong>|B| (magnitud de B):</strong> ${magB.toFixed(4)}</li>
                        <li><strong>Ángulo entre vectores:</strong> ${angle.toFixed(2)}°</li>
                        <li><strong>Vectores ${dot === 0 ? 'perpendiculares ⊥' : 'no perpendiculares'}</strong></li>
                    </ul>
                </div>
            `;
            
            document.getElementById('vectorsResult').innerHTML = result;
        }

        // INTERSECCIÓN
        function calculateIntersection() {
            const type = document.getElementById('intConicType').value;
            const m = parseFloat(document.getElementById('int_m').value);
            const b = parseFloat(document.getElementById('int_b').value);
            const param = parseFloat(document.getElementById('int_param').value);
            
            let result = '';
            let points = [];
            
            if (type === 'parabola') {
                const a_coef = param;
                const b_coef = -m;
                const c_coef = -b;
                
                const discriminant = b_coef**2 - 4*a_coef*c_coef;
                
                if (discriminant < 0) {
                    result = `<div class="result-box"><h3>🎯 No hay intersección</h3><p>La recta no interseca la parábola</p></div>`;
                } else if (discriminant === 0) {
                    const x = -b_coef / (2*a_coef);
                    const y = m*x + b;
                    points = [[x, y]];
                    result = `
                        <div class="result-box">
                            <h3>🎯 Intersección (Tangente)</h3>
                            <ul>
                                <li><strong>Punto único:</strong> (${x.toFixed(4)}, ${y.toFixed(4)})</li>
                                <li><strong>La recta es tangente a la parábola</strong></li>
                            </ul>
                        </div>
                    `;
                } else {
                    const x1 = (-b_coef + Math.sqrt(discriminant)) / (2*a_coef);
                    const x2 = (-b_coef - Math.sqrt(discriminant)) / (2*a_coef);
                    const y1 = m*x1 + b;
                    const y2 = m*x2 + b;
                    points = [[x1, y1], [x2, y2]];
                    result = `
                        <div class="result-box">
                            <h3>🎯 Intersecciones</h3>
                            <ul>
                                <li><strong>Punto 1:</strong> (${x1.toFixed(4)}, ${y1.toFixed(4)})</li>
                                <li><strong>Punto 2:</strong> (${x2.toFixed(4)}, ${y2.toFixed(4)})</li>
                                <li><strong>Distancia entre puntos:</strong> ${Math.sqrt((x2-x1)**2 + (y2-y1)**2).toFixed(4)}</li>
                            </ul>
                        </div>
                    `;
                }
            } else if (type === 'circle') {
                const r = param;
                const a_coef = 1 + m**2;
                const b_coef = 2*m*b;
                const c_coef = b**2 - r**2;
                
                const discriminant = b_coef**2 - 4*a_coef*c_coef;
                
                if (discriminant < 0) {
                    result = `<div class="result-box"><h3>🎯 No hay intersección</h3><p>La recta no interseca el círculo</p></div>`;
                } else if (discriminant === 0) {
                    const x = -b_coef / (2*a_coef);
                    const y = m*x + b;
                    points = [[x, y]];
                    result = `
                        <div class="result-box">
                            <h3>🎯 Intersección (Tangente)</h3>
                            <ul>
                                <li><strong>Punto único:</strong> (${x.toFixed(4)}, ${y.toFixed(4)})</li>
                                <li><strong>La recta es tangente al círculo</strong></li>
                            </ul>
                        </div>
                    `;
                } else {
                    const x1 = (-b_coef + Math.sqrt(discriminant)) / (2*a_coef);
                    const x2 = (-b_coef - Math.sqrt(discriminant)) / (2*a_coef);
                    const y1 = m*x1 + b;
                    const y2 = m*x2 + b;
                    points = [[x1, y1], [x2, y2]];
                    result = `
                        <div class="result-box">
                            <h3>🎯 Intersecciones</h3>
                            <ul>
                                <li><strong>Punto 1:</strong> (${x1.toFixed(4)}, ${y1.toFixed(4)})</li>
                                <li><strong>Punto 2:</strong> (${x2.toFixed(4)}, ${y2.toFixed(4)})</li>
                                <li><strong>Longitud de cuerda:</strong> ${Math.sqrt((x2-x1)**2 + (y2-y1)**2).toFixed(4)}</li>
                            </ul>
                        </div>
                    `;
                }
            }
            
            document.getElementById('intersectionResult').innerHTML = result;
            drawIntersection(type, param, m, b, points);
        }

        function drawIntersection(type, param, m, b, points) {
            const canvas = document.getElementById('intersectionCanvas');
            const ctx = canvas.getContext('2d');
            const w = canvas.width = 600;
            const h = canvas.height = 400;
            
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = '#0f172a';
            ctx.fillRect(0, 0, w, h);
            
            const scale = 30;
            const centerX = w / 2;
            const centerY = h / 2;
            
            // Ejes
            ctx.strokeStyle = '#475569';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, centerY);
            ctx.lineTo(w, centerY);
            ctx.moveTo(centerX, 0);
            ctx.lineTo(centerX, h);
            ctx.stroke();
            
            // Cónica
            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 3;
            ctx.beginPath();
            
            if (type === 'parabola') {
                for (let x = -10; x <= 10; x += 0.1) {
                    const y = param * x * x;
                    ctx.lineTo(centerX + x * scale, centerY - y * scale);
                }
            } else if (type === 'circle') {
                ctx.arc(centerX, centerY, param * scale, 0, Math.PI * 2);
            }
            ctx.stroke();
            
            // Recta
            ctx.strokeStyle = '#10b981';
            ctx.lineWidth = 2;
            ctx.beginPath();
            const x_left = -15;
            const x_right = 15;
            ctx.moveTo(centerX + x_left * scale, centerY - (m * x_left + b) * scale);
            ctx.lineTo(centerX + x_right * scale, centerY - (m * x_right + b) * scale);
            ctx.stroke();
            
            // Puntos de intersección
            ctx.fillStyle = '#ec4899';
            points.forEach(([x, y]) => {
                ctx.beginPath();
                ctx.arc(centerX + x * scale, centerY - y * scale, 8, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        // MODO DESAFÍO
        let timerInterval, score = 0, correctAnswers = 0, totalQuestions = 0, timeLeft = 30, currentQuestion;
        
        const questions = [
            { q: 'Parábola con p=2: ¿Longitud del latus rectum?', a: '8', t: 0.1 },
            { q: 'Parábola con p=3: ¿Coordenada y del foco?', a: '3', t: 0.1 },
            { q: 'Elipse a=5, b=3: ¿Valor de c?', a: '4', t: 0.2 },
            { q: 'Elipse a=10, b=6: ¿Longitud del eje mayor?', a: '20', t: 0.1 },
            { q: 'Hipérbola a=3, b=4: ¿Valor de c?', a: '5', t: 0.1 },
            { q: 'Distancia entre (0,0) y (3,4)?', a: '5', t: 0.1 },
            { q: 'Pendiente de la recta que pasa por (1,2) y (3,6)?', a: '2', t: 0.1 },
            { q: 'Punto medio entre (2,4) y (6,8)? (componente x)', a: '4', t: 0.2 },
            { q: '¿Cuántos radianes son 180°? (usa 3.14)', a: '3.14', t: 0.2 },
            { q: 'Hipotenusa si catetos son 3 y 4?', a: '5', t: 0.1 },
            { q: 'Parábola p=1.5: ¿Longitud latus rectum?', a: '6', t: 0.1 },
            { q: 'Elipse a=8, b=6: ¿Valor de c? (aproximado)', a: '5.29', t: 0.3 },
            { q: 'Hipérbola a=6, b=8: ¿Valor de c?', a: '10', t: 0.1 },
            { q: '¿Cuántos grados son π radianes?', a: '180', t: 0.1 },
            { q: 'Vector A(2,3) + B(1,4): componente i?', a: '3', t: 0.1 },
            { q: 'Magnitud del vector (3,4)?', a: '5', t: 0.1 },
            { q: 'Producto punto de (1,0) y (0,1)?', a: '0', t: 0.1 },
            { q: 'Distancia entre (1,1) y (4,5)?', a: '5', t: 0.2 }
        ];

        function startTest() {
            const name = document.getElementById('userName').value.trim();
            if (!name) {
                alert('⚠️ Ingresa tu nombre');
                return;
            }
            
            const difficulty = document.getElementById('difficulty').value;
            const timeMap = { easy: 40, medium: 30, hard: 20 };
            timeLeft = timeMap[difficulty];
            
            const userData = { name, score: 0, correct: 0 };
            
            score = 0;
            correctAnswers = 0;
            totalQuestions = 0;
            document.getElementById('score').textContent = score;
            document.getElementById('correct').textContent = correctAnswers;
            document.getElementById('testSetup').style.display = 'none';
            document.getElementById('testArea').style.display = 'block';
            
            nextQuestion();
        }

        function nextQuestion() {
            currentQuestion = questions[Math.floor(Math.random() * questions.length)];
            document.getElementById('question').textContent = currentQuestion.q;
            document.getElementById('answer').value = '';
            document.getElementById('answer').focus();
            
            const difficulty = document.getElementById('difficulty').value;
            const timeMap = { easy: 40, medium: 30, hard: 20 };
            timeLeft = timeMap[difficulty];
            document.getElementById('timer').textContent = timeLeft;
            
            clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                timeLeft--;
                document.getElementById('timer').textContent = timeLeft;
                
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    alert('⏰ ¡Tiempo agotado! Respuesta: ' + currentQuestion.a);
                    totalQuestions++;
                    nextQuestion();
                }
            }, 1000);
        }

        function submitAnswer() {
            clearInterval(timerInterval);
            
            const userAnswer = parseFloat(document.getElementById('answer').value.trim());
            const correctAnswer = parseFloat(currentQuestion.a);
            const tolerance = currentQuestion.t || 0.1;
            
            totalQuestions++;
            
            if (!isNaN(userAnswer) && Math.abs(userAnswer - correctAnswer) <= tolerance) {
                const points = Math.max(timeLeft * 10, 10);
                score += points;
                correctAnswers++;
                document.getElementById('score').textContent = score;
                document.getElementById('correct').textContent = correctAnswers;
                
                alert(`✅ ¡Correcto! +${points} puntos`);
            } else {
                alert(`❌ Incorrecto. Respuesta: ${correctAnswer}`);
            }
            
            saveScore();
            nextQuestion();
        }

        function skipQuestion() {
            clearInterval(timerInterval);
            score = Math.max(0, score - 5);
            document.getElementById('score').textContent = score;
            totalQuestions++;
            alert('⏭️ Pregunta saltada (-5 pts)');
            nextQuestion();
        }

        function endTest() {
            clearInterval(timerInterval);
            saveScore();
            alert(`🏁 Test finalizado!\n\n⭐ Puntos: ${score}\n✅ Correctas: ${correctAnswers}/${totalQuestions}\n📊 Precisión: ${totalQuestions > 0 ? ((correctAnswers/totalQuestions)*100).toFixed(1) : 0}%`);
            document.getElementById('testArea').style.display = 'none';
            document.getElementById('testSetup').style.display = 'block';
            viewRanking();
        }

        function saveScore() {
            const userData = { 
                name: document.getElementById('userName').value.trim(), 
                score: score, 
                correct: correctAnswers 
            };
            
            let scores = JSON.parse(localStorage.getItem('mathScores') || '[]');
            const idx = scores.findIndex(s => s.name === userData.name);
            
            if (idx !== -1) {
                if (score > scores[idx].score) {
                    scores[idx] = userData;
                }
            } else {
                scores.push(userData);
            }
            
            localStorage.setItem('mathScores', JSON.stringify(scores));
        }

        function viewRanking() {
            let scores = JSON.parse(localStorage.getItem('mathScores') || '[]');
            scores.sort((a, b) => b.score - a.score);
            
            if (scores.length === 0) {
                document.getElementById('rankingList').innerHTML = `
                    <div class="result-box" style="text-align: center; margin-top: 2rem;">
                        <h3>🏆 Ranking</h3>
                        <p style="color: var(--text-secondary);">¡Sé el primero en jugar!</p>
                    </div>
                `;
                return;
            }
            
            let html = '<div style="margin-top: 2rem;"><h3 style="text-align: center; font-size: 2rem; margin-bottom: 2rem;">🏆 Ranking de Campeones</h3>';
            
            scores.slice(0, 10).forEach((s, i) => {
                const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
                const emoji = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '🎖️';
                
                html += `
                    <div class="stat-item" style="display: flex; align-items: center; gap: 1rem; margin: 1rem 0;">
                        <div style="font-size: 2rem;">${emoji}</div>
                        <div style="flex: 1; text-align: left;">
                            <div style="font-weight: 600; font-size: 1.2rem;">${s.name}</div>
                            <div style="color: var(--text-secondary); font-size: 0.9rem;">✅ ${s.correct || 0} correctas</div>
                        </div>
                        <div style="font-size: 1.5rem; font-weight: 800; color: var(--success);">${s.score} pts</div>
                    </div>
                `;
            });
            
            html += '</div>';
            document.getElementById('rankingList').innerHTML = html;
        }

        // Enter key
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && document.getElementById('answer') === document.activeElement) {
                submitAnswer();
            }
        });

        // MathJax config
        window.MathJax = {
            tex: {
                inlineMath: [['\\(', '\\)']],
                displayMath: [['\\[', '\\]']]
            }
        };

        // ========================================
// SISTEMA DE TIMEOUT DE SESIÓN
// Auto-logout después de 30 minutos de inactividad
// ========================================

(function() {
    'use strict';

    // Configuración
    const INACTIVITY_TIME = 30 * 60 * 1000; // 30 minutos en milisegundos
    const WARNING_TIME = 28 * 60 * 1000;     // Advertencia a los 28 minutos
    const LOGIN_PAGE = 'index.html';

    let inactivityTimer;
    let warningTimer;
    let warningShown = false;

    // Verificar si el usuario está autenticado
    function checkAuth() {
        const userEmail = sessionStorage.getItem('userEmail');
        const loginTime = sessionStorage.getItem('loginTime');

        if (!userEmail || !loginTime) {
            // No hay sesión activa, redirigir al login
            redirectToLogin();
            return false;
        }
        return true;
    }

    // Función para redirigir al login
    function redirectToLogin() {
        sessionStorage.clear();
        window.location.href = LOGIN_PAGE;
    }

    // Función para mostrar advertencia
    function showWarning() {
        if (warningShown) return;
        warningShown = true;

        const warningDiv = document.createElement('div');
        warningDiv.id = 'inactivity-warning';
        warningDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 15px;
            box-shadow: 0 10px 40px rgba(245, 158, 11, 0.4);
            z-index: 10000;
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
            max-width: 400px;
            animation: slideInRight 0.5s ease-out;
        `;
        warningDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <span style="font-size: 2rem;">⚠️</span>
                <div>
                    <div style="font-size: 1.1rem; margin-bottom: 0.5rem;">Sesión Inactiva</div>
                    <div style="font-size: 0.9rem; opacity: 0.9;">Serás desconectado en 2 minutos por inactividad</div>
                </div>
            </div>
        `;

        document.body.appendChild(warningDiv);

        // Agregar animación CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            if (warningDiv.parentNode) {
                warningDiv.style.animation = 'slideInRight 0.5s ease-out reverse';
                setTimeout(() => warningDiv.remove(), 500);
            }
        }, 5000);
    }

    // Reiniciar el temporizador de inactividad
    function resetInactivityTimer() {
        // Limpiar temporizadores existentes
        clearTimeout(inactivityTimer);
        clearTimeout(warningTimer);
        
        // Remover advertencia si existe
        const existingWarning = document.getElementById('inactivity-warning');
        if (existingWarning) {
            existingWarning.remove();
        }
        warningShown = false;

        // Configurar advertencia (2 minutos antes del logout)
        warningTimer = setTimeout(() => {
            showWarning();
        }, WARNING_TIME);

        // Configurar logout automático (30 minutos)
        inactivityTimer = setTimeout(() => {
            console.log('⏰ Sesión expirada por inactividad');
            
            // Mostrar mensaje final
            const finalMsg = document.createElement('div');
            finalMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(15, 23, 42, 0.98);
                color: white;
                padding: 3rem;
                border-radius: 20px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                z-index: 10001;
                text-align: center;
                font-family: 'Poppins', sans-serif;
                border: 2px solid #6366f1;
            `;
            finalMsg.innerHTML = `
                <div style="font-size: 4rem; margin-bottom: 1rem;">🔒</div>
                <div style="font-size: 1.8rem; font-weight: 700; margin-bottom: 1rem;">Sesión Expirada</div>
                <div style="font-size: 1.1rem; color: #cbd5e1;">Tu sesión ha caducado por inactividad</div>
                <div style="margin-top: 1.5rem; font-size: 0.9rem; color: #94a3b8;">Redirigiendo al inicio de sesión...</div>
            `;
            document.body.appendChild(finalMsg);

            // Redirigir después de 2 segundos
            setTimeout(() => {
                redirectToLogin();
            }, 2000);
        }, INACTIVITY_TIME);
    }

    // Eventos que indican actividad del usuario
    const activityEvents = [
        'mousedown',
        'mousemove',
        'keypress',
        'scroll',
        'touchstart',
        'click'
    ];

    // Función de inicialización
    function initSessionTimeout() {
        // Verificar autenticación al cargar
        if (!checkAuth()) {
            return;
        }

        console.log('✅ Sistema de timeout de sesión activado (30 minutos)');

        // Agregar listeners para detectar actividad
        activityEvents.forEach(event => {
            document.addEventListener(event, resetInactivityTimer, true);
        });

        // Iniciar el temporizador
        resetInactivityTimer();

        // Verificar periódicamente si la sesión sigue válida
        setInterval(() => {
            if (!sessionStorage.getItem('userEmail')) {
                redirectToLogin();
            }
        }, 60000); // Cada minuto
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSessionTimeout);
    } else {
        initSessionTimeout();
    }

    // Limpiar al cerrar la página
    window.addEventListener('beforeunload', () => {
        clearTimeout(inactivityTimer);
        clearTimeout(warningTimer);
    });

})();

// ========================================
// OPCIONAL: Función para cerrar sesión manualmente
// ========================================
function logout() {
    sessionStorage.clear();
    window.location.href = 'index.html';
}

// Hacer la función disponible globalmente
window.logout = logout;

function cerrarSesion() {
        // Aquí podrías agregar lógica adicional si usas sesiones (por ejemplo, limpiar localStorage)
        window.location.href = "index.html"; // Redirige al index.html
    }