export interface Camera {
   id: string;
   nome: string;
   imageUrl: string;
}

export interface CameraGroup {
   titulo: string;
   cameras: Camera[];
}

export type ScrapedData = {
   terminalA: string;
   terminalB: string;
   esperaA: number;
   esperaB: number;
   embarcacoes: number;
   clima: string;
   cameras: {
      [key: string]: string;
   };
};
