import * as THREE from 'three';

export class OthelloBoard3D {
    constructor(scene) {
        this.scene = scene;
        this.cells = [];
        this.pieces = [];
        this.boardSize = 8;
        this.cellSize = 1;
        this.pieceRadius = 0.4;
        this.pieceHeight = 0.2;

        this.createBoard();
        this.createInitialPieces();
    }

    createBoard() {
        // ボードのベース
        const boardGeometry = new THREE.BoxGeometry(
            this.boardSize * this.cellSize + 0.5,
            0.3,
            this.boardSize * this.cellSize + 0.5
        );
        const boardMaterial = new THREE.MeshStandardMaterial({
            color: 0x2d5016,
            roughness: 0.7,
            metalness: 0.2
        });
        const boardMesh = new THREE.Mesh(boardGeometry, boardMaterial);
        boardMesh.receiveShadow = true;
        boardMesh.position.y = -0.15;
        this.scene.add(boardMesh);

        // セルの作成
        const cellGeometry = new THREE.BoxGeometry(
            this.cellSize * 0.95,
            0.1,
            this.cellSize * 0.95
        );

        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const cellMaterial = new THREE.MeshStandardMaterial({
                    color: (row + col) % 2 === 0 ? 0x3a7022 : 0x2d5016,
                    roughness: 0.8,
                    metalness: 0.1
                });

                const cell = new THREE.Mesh(cellGeometry, cellMaterial);
                cell.receiveShadow = true;
                cell.castShadow = true;

                const x = (col - this.boardSize / 2 + 0.5) * this.cellSize;
                const z = (row - this.boardSize / 2 + 0.5) * this.cellSize;
                cell.position.set(x, 0, z);

                cell.userData = { row, col };
                this.cells.push(cell);
                this.scene.add(cell);
            }
        }

        // グリッドラインの追加
        this.createGridLines();
    }

    createGridLines() {
        const gridMaterial = new THREE.LineBasicMaterial({ color: 0x000000, opacity: 0.5, transparent: true });
        const offset = this.boardSize * this.cellSize / 2;

        for (let i = 0; i <= this.boardSize; i++) {
            const pos = (i - this.boardSize / 2) * this.cellSize;

            // 縦線
            const vGeometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(pos, 0.06, -offset),
                new THREE.Vector3(pos, 0.06, offset)
            ]);
            const vLine = new THREE.Line(vGeometry, gridMaterial);
            this.scene.add(vLine);

            // 横線
            const hGeometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(-offset, 0.06, pos),
                new THREE.Vector3(offset, 0.06, pos)
            ]);
            const hLine = new THREE.Line(hGeometry, gridMaterial);
            this.scene.add(hLine);
        }
    }

    createInitialPieces() {
        this.pieces = Array(this.boardSize).fill(null).map(() => Array(this.boardSize).fill(null));

        // 初期配置
        this.createPiece(3, 3, 2); // 白
        this.createPiece(3, 4, 1); // 黒
        this.createPiece(4, 3, 1); // 黒
        this.createPiece(4, 4, 2); // 白
    }

    createPiece(row, col, player) {
        const geometry = new THREE.CylinderGeometry(
            this.pieceRadius,
            this.pieceRadius,
            this.pieceHeight,
            32
        );

        const material = new THREE.MeshStandardMaterial({
            color: player === 1 ? 0x2c3e50 : 0xecf0f1,
            roughness: 0.3,
            metalness: 0.5
        });

        const piece = new THREE.Mesh(geometry, material);
        piece.castShadow = true;
        piece.receiveShadow = true;

        const x = (col - this.boardSize / 2 + 0.5) * this.cellSize;
        const z = (row - this.boardSize / 2 + 0.5) * this.cellSize;
        piece.position.set(x, this.pieceHeight / 2 + 0.1, z);

        piece.userData = { row, col, player };
        this.pieces[row][col] = piece;
        this.scene.add(piece);

        // アニメーション
        piece.scale.set(0, 0, 0);
        this.animatePieceAppear(piece);
    }

    animatePieceAppear(piece) {
        const startTime = Date.now();
        const duration = 300;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const scale = this.easeOutBack(progress);
            piece.scale.set(scale, scale, scale);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    animatePieceFlip(piece, newPlayer) {
        const startTime = Date.now();
        const duration = 500;
        const oldColor = piece.material.color.clone();
        const newColor = new THREE.Color(newPlayer === 1 ? 0x2c3e50 : 0xecf0f1);

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // 回転アニメーション
            piece.rotation.x = progress * Math.PI;

            // 色の変更を半分のタイミングで
            if (progress >= 0.5 && piece.userData.player !== newPlayer) {
                piece.material.color.copy(newColor);
                piece.userData.player = newPlayer;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                piece.rotation.x = 0;
            }
        };

        animate();
    }

    easeOutBack(x) {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }

    updateBoard(board) {
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                const currentPlayer = board[row][col];
                const piece = this.pieces[row][col];

                if (currentPlayer !== 0 && !piece) {
                    // 新しい駒を配置
                    this.createPiece(row, col, currentPlayer);
                } else if (piece && piece.userData.player !== currentPlayer && currentPlayer !== 0) {
                    // 駒を裏返す
                    this.animatePieceFlip(piece, currentPlayer);
                } else if (currentPlayer === 0 && piece) {
                    // 駒を削除（通常は発生しない）
                    this.scene.remove(piece);
                    this.pieces[row][col] = null;
                }
            }
        }
    }
}
