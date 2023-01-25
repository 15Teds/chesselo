export interface EloResult {
    general?: {
        player1: {
            rating: number;
            rd: number;
            name: string;
        },
        player2: {
            rating: number;
            rd: number;
            name: string;
        },
        gameType: string;
    }
    player1?: {
        win: number;
        loss: number;
        draw: number;
    };
    player2?: {
        win: number;
        loss: number;
        draw: number;
    };
    error?: string;
} 