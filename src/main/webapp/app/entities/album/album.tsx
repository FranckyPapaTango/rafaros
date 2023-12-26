import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { byteSize, Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAlbum } from 'app/shared/model/album.model';
import { getEntities } from './album.reducer';

export const Album = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const albumList = useAppSelector(state => state.album.entities);
  const loading = useAppSelector(state => state.album.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="album-heading" data-cy="AlbumHeading">
        <Translate contentKey="rafarosApp.album.home.title">Albums</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="rafarosApp.album.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/album/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="rafarosApp.album.home.createLabel">Create new Album</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {albumList && albumList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="rafarosApp.album.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="rafarosApp.album.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="rafarosApp.album.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="rafarosApp.album.created">Created</Translate>
                </th>
                <th>
                  <Translate contentKey="rafarosApp.album.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {albumList.map((album, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/album/${album.id}`} color="link" size="sm">
                      {album.id}
                    </Button>
                  </td>
                  <td>{album.title}</td>
                  <td>{album.description}</td>
                  <td>{album.created ? <TextFormat type="date" value={album.created} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{album.user ? album.user.login : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/album/${album.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/album/${album.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/album/${album.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="rafarosApp.album.home.notFound">No Albums found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Album;
