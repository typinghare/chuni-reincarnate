import container from '../inversify';
import TYPES from '../types';
import { Game } from './game';

const game = container.get<Game>(TYPES.Game);
game.start().then();