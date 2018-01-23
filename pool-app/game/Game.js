import { branch, renderComponent } from 'recompose';
import NewGameContainer from './newGame/NewGameContainer';
import ActiveGameContainer from './activeGame/ActiveGameContainer';

export default branch(
  props => props.isGameInProgress,
  renderComponent(ActiveGameContainer)
)(NewGameContainer);
