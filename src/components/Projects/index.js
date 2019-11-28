import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProjectsActions from '~/store/ducks/projects';

import Modal from '~/components/Modal';
import Button from '~/styles/components/Button';

import { Container, Project } from './styles';

class Projects extends Component {
  static propTypes = {
    getProjectsRequest: PropTypes.func.isRequired,
    openProjectModal: PropTypes.func.isRequired,
    closeProjectModal: PropTypes.func.isRequired,
    activeTeam: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
    projects: PropTypes.shape({
      data: PropTypes.array,
      id: PropTypes.number,
      title: PropTypes.string,
    }),
  };

  componentDidMount() {
    const { getProjectsRequest, activeTeam } = this.props;

    if (activeTeam) {
      getProjectsRequest();
    }
  }

  render() {
    const {
      activeTeam, projects, openProjectModal, closeProjectModal,
    } = this.props;

    if (!activeTeam) return null;
    return (
      <Container>
        <header>
          <h1>{activeTeam.name}</h1>
          <div>
            <Button onClick={openProjectModal}>+ Novo</Button>
            <Button onClick={() => {}}>Membros</Button>
          </div>
        </header>

        { projects.data.map((project) => (
          <Project key={project.id}>
            <p>{project.title}</p>
          </Project>
        ))}

        { projects.projectModalOpen && (
          <Modal>
            <h1>Criar projeto</h1>

            <form obSubmit={() => {}}>
              <span>NOME</span>

              <input name="newProject" />

              <Button size="big" type="submit">Salvar</Button>
              <Button onClick={closeProjectModal} size="small" color="gray">Cancelar</Button>
            </form>
          </Modal>
        ) }

      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  activeTeam: state.teams.active,
  projects: state.projects,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(ProjectsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
