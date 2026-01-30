export enum Difficulty {
  Iniciante = 'Iniciante',
  Intermediario = 'Intermediário',
  Avancado = 'Avançado',
  Mestre = 'Mestre',
}

export enum Platform {
  Geral = 'Filosofia Geral',
  Steam = 'Steam',
  Discord = 'Discord',
  Servidores = 'Servidores Dedicados',
}

export type InteractiveComponentType = 
  | 'ConsoleSimulator' 
  | 'FlameBalance' 
  | 'ServerLayers' 
  | 'DialogueTree' 
  | 'RegexLab' 
  | 'CrisisDecision';

export interface Chapter {
  id: string;
  title: string;
  content: string; // HTML-like string
  interactiveComponent?: InteractiveComponentType; // Identificador do componente interativo
  interactiveData?: any; // Dados flexíveis para o componente (ex: cenários de diálogo)
}

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  difficulty: Difficulty;
  platform: Platform;
  tags: string[];
  description: string;
  chapters: Chapter[];
}