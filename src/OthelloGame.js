export class OthelloGame {
    constructor() {
        this.boardSize = 8;
        this.board = [];
        this.currentPlayer = 1; // 1: 黒, 2: 白
        this.reset();
    }

    reset() {
        // ボードを初期化
        this.board = Array(this.boardSize).fill(null).map(() => Array(this.boardSize).fill(0));

        // 初期配置
        const mid = this.boardSize / 2;
        this.board[mid - 1][mid - 1] = 2; // 白
        this.board[mid - 1][mid] = 1;     // 黒
        this.board[mid][mid - 1] = 1;     // 黒
        this.board[mid][mid] = 2;         // 白

        this.currentPlayer = 1; // 黒から開始
    }

    isValidMove(row, col) {
        if (row < 0 || row >= this.boardSize || col < 0 || col >= this.boardSize) {
            return false;
        }

        if (this.board[row][col] !== 0) {
            return false;
        }

        return this.getFlippedPieces(row, col).length > 0;
    }

    getFlippedPieces(row, col) {
        const flipped = [];
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];

        for (const [dr, dc] of directions) {
            const temp = [];
            let r = row + dr;
            let c = col + dc;

            while (r >= 0 && r < this.boardSize && c >= 0 && c < this.boardSize) {
                if (this.board[r][c] === 0) {
                    break;
                }

                if (this.board[r][c] === this.currentPlayer) {
                    flipped.push(...temp);
                    break;
                }

                temp.push([r, c]);
                r += dr;
                c += dc;
            }
        }

        return flipped;
    }

    makeMove(row, col) {
        if (!this.isValidMove(row, col)) {
            return false;
        }

        const flipped = this.getFlippedPieces(row, col);

        // 駒を配置
        this.board[row][col] = this.currentPlayer;

        // 挟んだ駒を裏返す
        for (const [r, c] of flipped) {
            this.board[r][c] = this.currentPlayer;
        }

        // ターンを切り替え
        this.switchPlayer();

        // 次のプレイヤーが置けない場合はスキップ
        if (!this.hasValidMoves() && !this.isGameOver()) {
            this.switchPlayer();
        }

        return true;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }

    hasValidMoves() {
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.isValidMove(row, col)) {
                    return true;
                }
            }
        }
        return false;
    }

    isGameOver() {
        // 両プレイヤーとも置けない場合、ゲーム終了
        const player1HasMoves = this.hasValidMovesForPlayer(1);
        const player2HasMoves = this.hasValidMovesForPlayer(2);

        return !player1HasMoves && !player2HasMoves;
    }

    hasValidMovesForPlayer(player) {
        const originalPlayer = this.currentPlayer;
        this.currentPlayer = player;
        const hasMoves = this.hasValidMoves();
        this.currentPlayer = originalPlayer;
        return hasMoves;
    }

    getScore() {
        let black = 0;
        let white = 0;

        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col] === 1) {
                    black++;
                } else if (this.board[row][col] === 2) {
                    white++;
                }
            }
        }

        return { black, white };
    }

    getValidMoves() {
        const moves = [];
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.isValidMove(row, col)) {
                    moves.push([row, col]);
                }
            }
        }
        return moves;
    }
}
