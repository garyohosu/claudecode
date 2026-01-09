import * as THREE from 'three';
import { OthelloGame } from './OthelloGame.js';
import { OthelloBoard3D } from './OthelloBoard3D.js';

class Game3D {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.game = new OthelloGame();

        this.setupScene();
        this.setupLights();
        this.board3D = new OthelloBoard3D(this.scene);
        this.setupInteraction();
        this.setupUI();

        this.animate();
    }

    setupScene() {
        // シーン
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a2e);

        // カメラ
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 8, 8);
        this.camera.lookAt(0, 0, 0);

        // レンダラー
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);

        // ウィンドウリサイズ対応
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        // Raycaster for mouse interaction
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
    }

    setupLights() {
        // 環境光
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // ディレクショナルライト
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -10;
        this.scene.add(directionalLight);

        // ポイントライト
        const pointLight = new THREE.PointLight(0x4a90e2, 1, 50);
        pointLight.position.set(0, 5, 0);
        this.scene.add(pointLight);
    }

    setupInteraction() {
        this.renderer.domElement.addEventListener('click', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObjects(this.board3D.cells);

            if (intersects.length > 0) {
                const cell = intersects[0].object;
                const row = cell.userData.row;
                const col = cell.userData.col;

                if (this.game.makeMove(row, col)) {
                    this.board3D.updateBoard(this.game.board);
                    this.updateUI();

                    if (this.game.isGameOver()) {
                        this.showGameOver();
                    }
                }
            }
        });

        // ホバーエフェクト
        this.renderer.domElement.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            this.raycaster.setFromCamera(this.mouse, this.camera);
            const intersects = this.raycaster.intersectObjects(this.board3D.cells);

            // すべてのセルをリセット
            this.board3D.cells.forEach(cell => {
                if (cell.material.emissive) {
                    cell.material.emissive.setHex(0x000000);
                }
            });

            // ホバーしているセルをハイライト
            if (intersects.length > 0) {
                const cell = intersects[0].object;
                const row = cell.userData.row;
                const col = cell.userData.col;

                if (this.game.isValidMove(row, col)) {
                    cell.material.emissive.setHex(0x333333);
                    this.renderer.domElement.style.cursor = 'pointer';
                } else {
                    this.renderer.domElement.style.cursor = 'default';
                }
            } else {
                this.renderer.domElement.style.cursor = 'default';
            }
        });
    }

    setupUI() {
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.game.reset();
            this.board3D.updateBoard(this.game.board);
            this.updateUI();
            document.getElementById('message').style.display = 'none';
        });

        this.updateUI();
    }

    updateUI() {
        const currentPlayer = this.game.currentPlayer === 1 ? '黒' : '白';
        document.getElementById('turn').textContent = `${currentPlayer}のターン`;

        const score = this.game.getScore();
        document.getElementById('black-score').textContent = score.black;
        document.getElementById('white-score').textContent = score.white;
    }

    showGameOver() {
        const score = this.game.getScore();
        let message = '';

        if (score.black > score.white) {
            message = '黒の勝利！';
        } else if (score.white > score.black) {
            message = '白の勝利！';
        } else {
            message = '引き分け！';
        }

        const messageEl = document.getElementById('message');
        messageEl.textContent = message;
        messageEl.style.display = 'block';
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // カメラを少しずつ回転
        const time = Date.now() * 0.0001;
        this.camera.position.x = Math.sin(time) * 10;
        this.camera.position.z = Math.cos(time) * 10;
        this.camera.lookAt(0, 0, 0);

        this.renderer.render(this.scene, this.camera);
    }
}

// ゲーム開始
new Game3D();
